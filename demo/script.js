angular.module('demoApp', ['ngIsVisible'])

.controller('demoCtrl', function ($scope) {
  var mambo = new Array(100)
  $scope.mambo = mambo
})
.directive('listitem', function () {
  return {
    restrict: 'C',
    link: function (scope) {
      scope.$on('visible', function (ev, isVisible) {
        scope.isVisible = isVisible;
        if (isVisible) {
          scope.seen = true
        }
      })
    }
  }
})