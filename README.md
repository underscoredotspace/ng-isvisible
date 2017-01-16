#ng-isvisible

Angular 1.x component to detect when DOM elements move in or out of view.

##Usage
Add `src/ng-isVisible.js` into your main document. In the outer DIV add attribute `vis-outer` and `vis-inner` to the inner list elements. For example: 

````html
<head>
  <script src="../bower_components/angularjs/angular.min.js"></script>
  <script src="../src/ngIsVisible.js"></script>
</head>
<body>
  <div vis-outer class="listouter">
    <div vis-inner class="listitem" data-ng-class="{'outview': !isVisible, 'seen': seen}" 
      ng-repeat="item in items" id="{{'item-' + $index}}">{{'Mambo number ' + $index}}</div>
  </div>
</body>
````
  
A directive will be required for the inner elements to allow the 'visible' event to be utilised. In the example here (as in the demo supplied), a property called isVisible in the listitem's scope is made true or false depending on visibility. The example shows how this would be used to add a CSS class reflecting current visbility, and whether or not the element has been seen. 

````javascript
angular.module('yourAppName', ['ngIsVisible'])
.directive('listitem', function() {
  return {
    restrict: 'C',
    controller: function($scope) {
      $scope.$on('visible', function(ev, isVisible) {
        $scope.isVisible = isVisible;
        if (isVisible) {
          $scope.seen = true;
        }
      });
    }
  }
});
````

The full demo is in the demo folder. 

##Optional Attributes
The delay between scroll and update can be altered from the default 300ms by adding `vis-delay="[ms]"` to the `vis-outer` element. You can also add `vis-remove="true"` to the inner elements if you never want the visble state to be set back to false if it has been seen already. This behaviour may slightly speed up running. 

##Limitations
- Could probably still be faster
- `vis-outer` can't be used with window object. Workaround to create a DIV of 100vw * 100vh as scrollable frame.

##TODO
- Better documetation
- Tests
- Improved var naming
- Bower installation