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

services.service('VoteService', ['$http', '$q',  function($http, $q) {
  this.isVoteOpen = function() {
    
    var deferred = $q.defer();    
    $http.get('/vote/status/').success(function(result) {
      deferred.resolve(result.status == "open");
    });
    return deferred.promise;
  };  
}]);