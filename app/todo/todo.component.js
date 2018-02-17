import angular from 'angular';

import todoHtml from './todo.html';

/* @ngInject */
let todoComponent = {
  template: todoHtml,
  controllerAs: 'todo',
  bindings: {
    store: '<'
  },
  controller: TodoCtrl
};

/* @ngInject */
function TodoCtrl($scope, $state, $filter, todoService) {
  'use strict';

  const $ctrl = this;

  let todos;

  $ctrl.$onInit = function () {
    $ctrl.title = todoService.title();
    todos = $scope.todos = $ctrl.store.todos;
  };

  // Monitor the current route for changes and adjust the filter accordingly.
  $scope.$watch(() => $state.current.name, (newVal) => {
    $scope.statusFilter = newVal === 'todomvc.active' ? {completed: false} :
      newVal === 'todomvc.completed' ? {completed: true} : {};
  });

  $scope.newTodo = '';
  $scope.editedTodo = null;

  $scope.$watch('todos', function () {
    $scope.remainingCount = $filter('filter')(todos, {completed: false}).length;
    $scope.completedCount = todos.length - $scope.remainingCount;
    $scope.allChecked = !$scope.remainingCount;
  }, true);


  $scope.addTodo = function () {
    var newTodo = {
      title: $scope.newTodo.trim(),
      completed: false
    };

    if (!newTodo.title) {
      return;
    }

    $scope.saving = true;
    $ctrl.store.insert(newTodo)
      .then(function success() {
        $scope.newTodo = '';
      })
      .finally(function () {
        $scope.saving = false;
      });
  };

  $scope.editTodo = function (todo) {
    $scope.editedTodo = todo;
    // Clone the original todo to restore it on demand.
    $scope.originalTodo = angular.extend({}, todo);
  };

  $scope.saveEdits = function (todo, event) {
    // Blur events are automatically triggered after the form submit event.
    // This does some unfortunate logic handling to prevent saving twice.
    if (event === 'blur' && $scope.saveEvent === 'submit') {
      $scope.saveEvent = null;
      return;
    }

    $scope.saveEvent = event;

    if ($scope.reverted) {
      // Todo edits were reverted-- don't save.
      $scope.reverted = null;
      return;
    }

    todo.title = todo.title.trim();

    if (todo.title === $scope.originalTodo.title) {
      $scope.editedTodo = null;
      return;
    }

    $ctrl.store[todo.title ? 'put' : 'delete'](todo)
      .then(function success() {
      }, function error() {
        todo.title = $scope.originalTodo.title;
      })
      .finally(function () {
        $scope.editedTodo = null;
      });
  };

  $scope.revertEdits = function (todo) {
    todos[todos.indexOf(todo)] = $scope.originalTodo;
    $scope.editedTodo = null;
    $scope.originalTodo = null;
    $scope.reverted = true;
  };

  $scope.removeTodo = function (todo) {
    $ctrl.store.delete(todo);
  };

  $scope.saveTodo = function (todo) {
    $ctrl.store.put(todo);
  };

  $scope.toggleCompleted = function (todo, completed) {
    if (angular.isDefined(completed)) {
      todo.completed = completed;
    }
    $ctrl.store.put(todo, todos.indexOf(todo))
      .then(function success() {
      }, function error() {
        todo.completed = !todo.completed;
      });
  };

  $scope.clearCompletedTodos = function () {
    $ctrl.store.clearCompleted();
  };

  $scope.markAll = function (completed) {
    angular.forEach(todos, function (todo) {
      if (todo.completed !== completed) {
        $scope.toggleCompleted(todo, completed);
      }
    });
  };
}


export default todoComponent;
