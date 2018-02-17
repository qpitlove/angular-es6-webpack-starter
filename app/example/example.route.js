/* @ngInject */
function exampleRoutes($stateProvider) {
  $stateProvider
    .state('example', {
      url: '/example',
      component: 'example'
    })
}

export default exampleRoutes;
