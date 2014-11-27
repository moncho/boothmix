'use strict';
var v24App = angular.module('v24App', [
    'ngAnimate',
    'ngRoute',
    'ngResource',
    'v24Services',
    'v24Controllers'
]);
v24App.config(['$compileProvider', function ($compileProvider) {
  $compileProvider.debugInfoEnabled(false);
}]);