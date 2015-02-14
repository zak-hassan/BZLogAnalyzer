'use strict';

(function(){

  var SearchCtrl=function($scope){
    $scope.country="Canada";
    $scope.sidebar="";

  };
  angular.module('myApp.search', ['ngRoute'])
      .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/search', {
          templateUrl: 'search/search.html',
          controller: 'SearchCtrl'
        });
      }]).controller('SearchCtrl', SearchCtrl);

}())
