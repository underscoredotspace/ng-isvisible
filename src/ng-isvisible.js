angular.module('ngIsVisible', [])
.directive('visOuter', function($window) {
  return {
    restrict: 'A',
    compile: function() {
      return {
        post: function(scope, element, attrs) {
          var ngVis = {
            _timer: null,
            _delay: Number(attrs.visDelay) || 300,
            _scrolled: function() {
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
                self._scrolled(e, p);
                self._timer = null;
              }, this._delay);
            }
          }
          angular.element($window).bind('resize', function() {
            ngVis.check();
          })
          element.bind('scroll', function () {
            ngVis.check();
          });
          scope.$on('destroy', function(e) {
              clearTimeout(this._timer);
          });
          ngVis.check();
        }
      }
    }
  };
})

.directive('visInner', function() {
  return {
    restrict: 'A',
    compile: function() {
      return {
        pre: function(scope, elem, attrs) {
          function check(e, p) {
            eTop = e.offsetTop;
            eBot = e.offsetTop + e.offsetHeight;
            pTop = p.scrollTop;
            pBot = p.clientHeight + p.scrollTop;;
            visible = (eTop >= pTop) && (eBot <= pBot);
            scope.$emit('visible', visible);

            if (visible && attrs.visRemove=="true") {
              scope.visSeen = true;
            }
          }

          scope.$on('scrolled', function(ev, p) {
            if((elem[0].parentElement.id != "") && (elem[0].parentElement.id == p.id)) {
              if (!scope.visSeen || !attrs.visRemove=="true") {
                check(elem[0], p);
              }
            }
          });
        }
      }
    }
  }
})