'use strict';

(function(){

  var HomeCtrl = function( $scope, $location ) {
    $scope.country= "Canada";
    $scope.title="";
    $scope.meta="";
    $scope.prefix="CA/";
    $scope.fetchSearch=function fetchSearch() {
      var role= $scope.role || "";
      var local= $scope.location || "";
      if ($scope.country == "Canada") {
        window.location.replace("http://www.bzcareer.com/CA/search?keyword=" + role + "&local=" + local);
      } else {
        window.location.replace("http://www.bzcareer.com/search?keyword=" + role + "&local=" + local);
      }
    }


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
