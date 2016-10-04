// Landing Component
angular
  .module('app')
  .component('landing', {
    templateUrl: 'components/landing.html',
    controller: LandingCtrl,
    bindings: {
      user: '<'
    }
  })

function LandingCtrl (Profiles, $firebaseObject) {
  var ctrl = this

  ctrl.$onInit = function () {
    ctrl.profiles = $firebaseObject(Profiles)
  }
}
