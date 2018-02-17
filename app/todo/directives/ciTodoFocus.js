/* @ngInject */
function ciTodoFocus($timeout) {
  'use strict';

  return function (scope, elem, attrs) {
    scope.$watch(attrs.ciTodoFocus, function (newVal) {
      if (newVal) {
        $timeout(function () {
          elem[0].focus();
        }, 0, false);
      }
    });
  };
}

export default ciTodoFocus;
