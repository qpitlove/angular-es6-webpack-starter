/* @ngInject */
function ciTodoEscape() {
  'use strict';

  var ESCAPE_KEY = 27;

  return function (scope, elem, attrs) {
    elem.bind('keydown', function (event) {
      if (event.keyCode === ESCAPE_KEY) {
        scope.$apply(attrs.ciTodoEscape);
      }
    });

    scope.$on('$destroy', function () {
      elem.unbind('keydown');
    });
  };
}

export default ciTodoEscape;
