angular.module("onScreenApp", [])

.controller("onScreenCtrl", function($scope, $rootScope, $timeout) {
  $scope.items = [];
  for (i = 1; i <= 3000; i++) {
    $scope.items.push({
      "title": "Mambo number " + i,
      "index": i,
      "seen": false
    });
  }
})

.directive('listouter', function($rootScope) {
  return {
    restrict: 'C',
    compile: function() {
      return function(scope, element, attributes) {
        element.on('scroll', function() {
          $rootScope.$broadcast('scrolled', element[0]);
          scope.$digest();
        });
      }
    }
  };
})

.directive("listitem", function() {
  return {
    restrict: "C",
    controller: function($scope) {      
      $scope.item.visible = function(isVisible) {
        $scope.item.isVisible = isVisible;
        if (isVisible) {
          $scope.item.seen = true;
        }
        $scope.$digest();
      }
    },
    compile: function() {
      return {
        pre: function(scope, elem, attrs) {
          var ngVis = {
            _timer: null,
            _delay: 300,
            check: function(e, p) {
              var self = this;
              if (this._timer) {
                  clearTimeout(this._timer);
                  this._timer = null;
              }
              this._timer = setTimeout(function() {
                  self._check(e, p);
                  self._timer = null;
              }, this._delay);
            },
            _check: function(e, p) {
              eTop = e.offsetTop;
              eBot = e.offsetTop + e.offsetHeight;
              sTop = p.scrollTop;
              sBot = p.clientHeight + p.scrollTop;

              scope.item.visible((eTop >= sTop) && (eBot <= sBot));
            }
          }

          scope.$on('scrolled', function() {
              ngVis.check(elem[0], elem.parent()[0]);
          });
          scope.$on("destroy", function(e) {
              clearTimeout(this._timer);
          });
        },
        post: function(scope, elem, attrs) {
          scope.$broadcast('scrolled', elem[0]);
        }
      }
    }
  }
})