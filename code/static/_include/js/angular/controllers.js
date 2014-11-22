
var v24App = angular.module('v24App', []);


v24App.controller('workersCtrl', function ($scope, $http) {
  $http.get('data/data.json').success(function(data) {
  	
    $scope.workers = data;
  }).
  error(function(data, status, headers, config) {
    alert("error")
  });

});