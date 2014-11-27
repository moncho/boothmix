'use strict';
var services = angular.module('v24Services', ['ngResource']);

services.factory('V24WorkersService', ['$resource',
  function($resource){
    return $resource('/data/data.json', {}, {
      query: {method:'GET', isArray:true}
    });
}]);

services.factory('FileteService', ['$resource',
  function($resource){
    return $resource('/data/filemix_data.json', {}, {
      query: {method:'GET', isArray:true}
    });
}]);

services.factory('ItalyService', ['$resource',
  function($resource){
    return $resource('/data/italianmix_data.json', {}, {
      query: {method:'GET', isArray:true}
    });
}]);
