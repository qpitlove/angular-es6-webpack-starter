/* @ngInject */
function todoApi ($resource) {
  'use strict';

  var store = {
    todos: [],

    api: $resource('/api/todos/:id', null,
      {
        update: { method:'PUT' }
      }
    ),

    clearCompleted: function () {
      var originalTodos = store.todos.slice(0);

      var incompleteTodos = store.todos.filter(function (todo) {
        return !todo.completed;
      });

      angular.copy(incompleteTodos, store.todos);

      return store.api.delete(function () {
      }, function error() {
        angular.copy(originalTodos, store.todos);
      });
    },

    delete: function (todo) {
      var originalTodos = store.todos.slice(0);

      store.todos.splice(store.todos.indexOf(todo), 1);
      return store.api.delete({ id: todo.id },
        function () {
        }, function error() {
          angular.copy(originalTodos, store.todos);
        });
    },

    get: function () {
      return store.api.query(function (resp) {
        angular.copy(resp, store.todos);
      });
    },

    insert: function (todo) {
      var originalTodos = store.todos.slice(0);

      return store.api.save(todo,
        function success(resp) {
          todo.id = resp.id;
          store.todos.push(todo);
        }, function error() {
          angular.copy(originalTodos, store.todos);
        })
        .$promise;
    },

    put: function (todo) {
      return store.api.update({ id: todo.id }, todo)
        .$promise;
    }
  };

  return store;
}

/* @ngInject */
export default todoApi;
