'use strict';

var v24AppControllers = angular.module('v24Controllers', []);

v24AppControllers.controller('workersCtrl', function ($scope, $http, V24WorkersService) {

  $scope.workers = V24WorkersService.query();

  $scope.canVote = function() {
    canVote = false;
    $http.get('/vote/status/').success(function(data) {
     canVote = data.status == "open";
    });
    return canVote;
  };

  $scope.getNumber = function(num) {
	  return new Array(num);   
  };

  $scope.vote = function(id,score) {
    $http.get('/vote/rate/'+id+'/'+score+'/').
      success(function(data, status, headers, config) {
        console.log("exito: "+data);
      }).
      error(function(data, status, headers, config) {
        console.log("error: "+data);
      });
  }
});

v24AppControllers.controller('file_workersCtrl', function ($scope, $http, FileteService) {
    $scope.workers = FileteService.query();  
});

v24AppControllers.controller('it_workersCtrl', function ($scope, $http, ItalyService) {
  $scope.workers = ItalyService.query();
});



v24AppControllers.controller('winnerCtrl', function ($scope, $http) {
  $http.get('vote/top/2/').success(function(data) {
    $scope.winners = data;

  }).
  error(function(data, status, headers, config) {
    console.log("error loading winners")
  });
});