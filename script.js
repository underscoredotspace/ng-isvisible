angular.module("onScreenApp", [])

.controller("onScreenCtrl", function($scope) {
  $scope.items = [];
  for (i = 1; i <= 300; i++) {
    $scope.items.push({
      "title": "Mambo number " + i,
      "index": i,
      "seen": false
    });
  }
})

.directive('listouter', function() {
  return {
    restrict: 'C',
    compile: function() {
      return {
        post: function(scope, element, attributes) {
          var ngVisO = {
          _timer: null,
            _delay: 300,
            _check: function() {
              scope.$broadcast('scrolled', element[0]);
              scope.$digest();
            },
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
            }
          }
          element.bind('scroll', function () {
            ngVisO.check();
          });
          ngVisO.check();
        }
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
      }
    },
    compile: function() {
      return {
        pre: function(scope, elem, attrs) {
          var ngVisI = {
            check: function(e, p) {
              eTop = e.offsetTop;
              eBot = e.offsetTop + e.offsetHeight;
              sTop = p.scrollTop;
              sBot = p.clientHeight + p.scrollTop;

              scope.item.visible((eTop >= sTop) && (eBot <= sBot));
            }
          }

          scope.$on('scrolled', function(ev, p) {
              ngVisI.check(elem[0], p);
          });
          scope.$on("destroy", function(e) {
              clearTimeout(this._timer);
          });
        }
      }
    }
  }
})