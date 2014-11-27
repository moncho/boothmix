'use strict';

var v24AppControllers = angular.module('v24Controllers', []);

v24AppControllers.controller('workersCtrl', function ($scope, $http, V24WorkersService, VoteService) {

  $scope.workers = V24WorkersService.query();
  $scope.ratings = new Array($scope.workers.length);
  VoteService.isVoteOpen().then(function(isOpen){
    $scope.voteOpen = isOpen;
  });

  $scope.vote = function(id,score) {
    $scope.ratings[id - 1] = score;
    $http.get('/vote/rate/'+id+'/'+score+'/').
      success(function(data, status, headers, config) {
        
      })
  }
});

v24AppControllers.controller('file_workersCtrl', function ($scope, $http, FileteService, VoteService) {
    $scope.workers = FileteService.query();  
    VoteService.isVoteOpen().then(function(isOpen){
    $scope.voteOpen = isOpen;
  });
});

v24AppControllers.controller('it_workersCtrl', function ($scope, $http, ItalyService, VoteService) {
  $scope.workers = ItalyService.query();
  VoteService.isVoteOpen().then(function(isOpen){
    $scope.voteOpen = isOpen;
  });
});



v24AppControllers.controller('winnerCtrl', function ($scope, $http, V24WorkersService) {
  $http.get('vote/top/35/').success(function(data) {
    $scope.winners = data;
    $scope.workers = V24WorkersService.query();

  }).
  error(function(data, status, headers, config) {
    console.log("error loading winners")
  });
});
