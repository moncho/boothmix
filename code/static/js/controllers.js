var mixBoothApp= angular.module('MixBoothApp', []);

mixBoothApp.controller('PicturesListCtrl', function ($scope) {
  $scope.pictures = [
    {'name': 'rcres-rcres',
     'comment': 'Dont like this one..'},
    {'name': 'rcres-rcres-2',
     'comment': 'Even worse'},
    {'name': 'rcres-rcres-3',
     'comment': 'And nope....'}
  ];
});