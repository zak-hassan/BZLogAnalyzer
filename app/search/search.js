'use strict';

(function(){

  var SearchCtrl=function($scope, PaginQueue, datacontext){
    $scope.country="Canada";
    $scope.sidebar="";


      $scope.next = function () {
          PaginQueue.pagin_next();
      }
      $scope.prev = function () {
          PaginQueue.pagin_prev();
      }

      $scope.validateSearch=function () {

          if ($scope.role.trim().length == 0 && $scope.local.trim().length == 0) {
              $("#err").modal('show'); // TODO: Create Angular Modal Service to popup dialogs with custom messages.
          } else {
              window.location.replace('http://' + location.host + "/<%-prefix %>search?keyword=" + encodeURIComponent(role) + "&local=" + encodeURIComponent(local));
          }
      };

      $scope.fetchResults=function(num){
          // TODO: Add logic to utilize data
          datacontext.getJob($scope.role,$scope.local, num);
      };

      $scope.setupSidebar=function(){
          // TODO: Add logic to setup the sidebar...
      };

      $scope.generateMap=function(){
          // TODO: Add logic to generate map...
      };

  };
  angular.module('myApp.search', ['ngRoute', 'myApp.service.PaginQueue', 'myApp.service.datacontext'])
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
