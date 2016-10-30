angular
  .module('app')
  .component('notFound', {
    templateUrl: 'components/not-found.html',
    controller: NotFoundCtrl
  })

function NotFoundCtrl () {
  var ctrl = this

  ctrl.$onInit = function () {
  }
}
