function todoService($state) {

  return {
    title: () => $state.current.name
  }

}
/* @ngInject */
export default todoService;
