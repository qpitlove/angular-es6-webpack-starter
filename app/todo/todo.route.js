/* @ngInject */
function todoRoutes($stateProvider) {
  $stateProvider
    .state('todomvc', {
      abstract: true,
      url: '/todomvc',
      component: 'todomvc',
      resolve: {
        /* @ngInject */
        store: function (todoStorage) {
          // Get the correct module (API or localStorage).
          todoStorage.get();
          return todoStorage;
          // return todoStorage.then(function (module) {
          //   module.get(); // Fetch the todo records in the background.
          //   return module;
          // });
        }
      }
    });

  $stateProvider
    .state('todomvc.all', {
      url: ''
    });

  $stateProvider
    .state('todomvc.active', {
      url: '/active'
    });

  $stateProvider
    .state('todomvc.completed', {
      url: '/completed'
    });
}

export default todoRoutes;
