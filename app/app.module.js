import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngResource from 'angular-resource';

import example from './example/example.module';
import todo from './todo/todo.module';

import appRoutes from './app.route';

import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';
// import '../node_modules/todomvc-common/base.css';
// import '../node_modules/todomvc-app-css/index.css';

import base from 'todomvc-common/base.js';
// import base from '../node_modules/todomvc-common/base.js';

require('./main.scss');

angular.module('app', [
  uirouter,
  ngResource,
  'example',
  'todomvc'
])
.config(appRoutes);
