/* @ngInject */
function todoStorage($http, $injector) {
  'use strict';

  // Detect if an API backend is present. If so, return the API module, else
  // hand off the localStorage adapter
  return $http.get('/api')
    .then(function () {
      return $injector.get('todoApi');
    }, function () {
      return $injector.get('todoLocalStorage');
    });
}

export default todoStorage;
