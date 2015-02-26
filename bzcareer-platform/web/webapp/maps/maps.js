'use strict';


(function(){

  var MapsCtrl=function(){

  };

  angular.module('myApp.maps', ['ngRoute'])
      .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/maps', {
          templateUrl: 'maps/maps.html',
          controller: 'MapsCtrl'
        });
      }]).controller('MapsCtrl', MapsCtrl);
}());

