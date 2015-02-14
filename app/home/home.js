'use strict';

(function(){

  var HomeCtrl = function( $scope ) {
    $scope.country= "Canada";
    $scope.title="";
    $scope.meta="";
    $scope.prefix="CA/";
  };

  angular.module('myApp.home', ['ngRoute'])
      .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
          templateUrl: 'home/home.html',
          controller: 'HomeCtrl'
        });
        //TODO: Configure the url to use $locationProvider.html5mode(true) .
      }]).controller('HomeCtrl', HomeCtrl);
}())
