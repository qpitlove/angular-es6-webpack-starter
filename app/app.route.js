/* @ngInject */
function appRoutes($urlRouterProvider) {
  $urlRouterProvider.when('', '/');
  $urlRouterProvider.when('/', '/todomvc');
}
export default appRoutes;
