angular
  .module('app')
  .component('landing', {
    templateUrl: 'components/landing.html',
    controller: LandingCtrl,
    bindings: {
      user: '<'
    }
  })

function LandingCtrl (Auth, $log, $window, $interval, $timeout, $firebaseArray, $firebaseObject, mapboxToken, mapboxgl) {
  var ctrl = this
  var map = null
  var intervalID

  var geo_options = {
    enableHighAccuracy: true,
    maximumAge        : 30000,
    timeout           : 27000
  }

  ctrl.$onInit = function () {
    ctrl.geolocations = $firebaseArray(
      firebase.database().ref('geolocations')
    )

    ctrl.geolocations.$watch(function(event){
      if (map && map.loaded() && ctrl.geolocations) {
        loadMarkers()
      }
    })

    Auth.$onAuthStateChanged(function (firebaseUser) {
      if (firebaseUser) {
        ctrl.geolocation = $firebaseObject(
          firebase.database().ref('geolocations/' + firebaseUser.uid)
        )

        ctrl.geolocation.$loaded(function(){
          $window.navigator.geolocation.watchPosition(geoSuccess, geoError, geo_options)
        })
      }
    })

    mapboxgl.accessToken = mapboxToken

    $timeout(function(){
      map = new mapboxgl.Map({
        container: 'graph-map',
        style: 'mapbox://styles/mapbox/dark-v9'
      })
    }, 0)

    intervalID = $interval(
      mapInitLoadMarkers, 250
    )
  }

  // Map functions
  function mapInitLoadMarkers () {
    if (map && map.loaded() && ctrl.geolocations) {
      loadMarkers()
      $interval.cancel(intervalID)
    }
  }

  function loadMarkers () {
    var bounds = new mapboxgl.LngLatBounds()
    var numGeoLocations = 0

    if(!ctrl.geolocations) { return }

    _.each(ctrl.geolocations, function (value, key) {
      // Check for geolocation
      if(!value) { return }

      // Count how many profiles exists with geo locations
      numGeoLocations += 1

      // Extend boundary to reset map view later
      bounds.extend([value.longitude, value.latitude])

      var el = document.createElement('div')
      el.id = key
      el.className = 'marker'

      var marker = new mapboxgl.Marker(el)
        .setLngLat([value.longitude, value.latitude])
        .addTo(map)

      $timeout(function(){
        marker.remove()
      }, 30000)
    })

    if (numGeoLocations === 1) {
      map.setZoom(20)
      map.setCenter([ctrl.geolocations[0].longitude, ctrl.geolocations[0].latitude])
    } else if (numGeoLocations > 1) {
      map.fitBounds(bounds, { padding: 100 })
    }
  }

  // Geo location functions
  // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
  function geoSuccess(position) {
    if (!ctrl.geolocation) { return }

    ctrl.geolocation.displayName = ctrl.user.displayName
    ctrl.geolocation.photoURL = ctrl.user.photoURL
    ctrl.geolocation.timestamp = position.timestamp
    ctrl.geolocation.accuracy = position.coords.accuracy
    ctrl.geolocation.latitude = position.coords.latitude
    ctrl.geolocation.longitude = position.coords.longitude

    ctrl.geolocation.$save()
  }

  function geoError() {
    $log.debug('no location available')
  }
}
