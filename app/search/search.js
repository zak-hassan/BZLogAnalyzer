'use strict';

(function(){

  var SearchCtrl=function($scope, PaginQueue){
    $scope.country="Canada";
    $scope.sidebar="";


      $scope.next = function () {
          PaginQueue.pagin_next();
      }
      $scope.prev = function () {
          PaginQueue.pagin_prev();
      }

  };
  angular.module('myApp.search', ['ngRoute', 'myApp.service.PaginQueue'])
      .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/search', {
          templateUrl: 'search/search.html',
          controller: 'SearchCtrl'
        });
      }]).controller('SearchCtrl', SearchCtrl)
      .directive('searchmorebutton',function(){
        return {
          templateUrl: "templates/SearchMoreButton.html",
          restrict: "E",
          scope:{
            company : "=",
            loc: "="
          },
          replace: true
        };

      })
      .directive('socialmedia',function(){
          return {
            templateUrl: "templates/socialmediabuttons.html",
            restrict: "E",
            scope:{
              company : "=",
              loc: "="
            },
            replace: true
          };

  });

}())
