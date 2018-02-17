import angular from 'angular';
import routing from './todo.route';
import todoComponent from './todo.component';
import todoService from './todo.service';

import ciTodoEscape from './directives/ciTodoEscape';
import ciTodoFocus from './directives/ciTodoFocus';
import todoStorage from './services/todoStorage';
import todoLocalStorage from './services/todoLocalStorage';
import todoApi from './services/todoApi';

/* @ngInject */
angular
  .module('todomvc', [])
  .component('todomvc', todoComponent)
  .directive('ciTodoEscape', ciTodoEscape)
  .directive('ciTodoFocus', ciTodoFocus)
  .factory('todoService', todoService)
  .factory('todoStorage', todoStorage)
  .factory('todoLocalStorage', todoLocalStorage)
  .factory('todoApi', todoApi)
  .config(routing);

