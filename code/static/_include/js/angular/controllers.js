
var v24App = angular.module('v24App', ['ngAnimate']);


v24App.controller('workersCtrl', function ($scope, $http) {
  $http.get('/data/data.json').success(function(data) {
    $scope.workers = data;
  }).
  error(function(data, status, headers, config) {
    console.log("error loading workers")
  });

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

v24App.controller('file_workersCtrl', function ($scope, $http) {
  $http.get('/data/filemix_data.json').success(function(data) {
    $scope.workers = data;
  }).
  error(function(data, status, headers, config) {
    console.log("error loading fileworkers")
  });
});

v24App.controller('it_workersCtrl', function ($scope, $http) {
  $http.get('/data/italianmix_data.json').success(function(data) {
    $scope.workers = data;
  }).
  error(function(data, status, headers, config) {
    console.log("error loading fileworkers")
  });
});