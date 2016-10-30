angular
  .module('app')
  .component('main', {
    templateUrl: 'components/main.html',
    controller: MainCtrl
  })

function MainCtrl ($mdSidenav, $timeout, $log, $state, Auth, $firebaseObject) {
  var ctrl = this

  ctrl.toggleLeftNav = buildDelayedToggler('leftNav')

  ctrl.$onInit = function () {
    firebaseAuth()
  }

  ctrl.signIn = function () {
    Auth.$signInWithRedirect('google').then(function (firebaseUser) {
      $log.debug(firebaseUser)
    }).catch(function (error) {
      $log.debug(error)
    })
  }

  ctrl.signOut = function () {
    Auth.$signOut().then(function () {
      // Sign-out successful.
    }, function (error) {
      $log.debug(error)
    })
  }

  ctrl.goTo = function (route) {
    $state.go(route)
  }

  function firebaseAuth () {
    Auth.$onAuthStateChanged(function (firebaseUser) {
      if (firebaseUser) {
        ctrl.user = $firebaseObject(
          firebase.database().ref('profiles/' + firebaseUser.uid)
        )

        ctrl.user.$loaded(function() {
          // Save current user profile
          ctrl.user.displayName = firebaseUser.displayName
          ctrl.user.email = firebaseUser.email
          ctrl.user.photoURL = firebaseUser.photoURL

          ctrl.user.$save()
        })
      }
    })
  }

  function debounce (func, wait, context) {
    var timer

    return function debounced () {
      var context = this
      var args = Array.prototype.slice.call(arguments)
      $timeout.cancel(timer)
      timer = $timeout(function () {
        timer = undefined
        func.apply(context, args)
      }, wait || 10)
    }
  }

  function buildDelayedToggler (navID) {
    return debounce(function () {
      $mdSidenav(navID)
        .toggle()
    }, 200)
  }
}
