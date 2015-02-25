'use strict';

angular.module('myApp.about', ['ngRoute','myApp.directive.about','myApp.directive.topBanner'])

.config(['$routeProvider', function($routeProvider ) {
  $routeProvider.when('/about', {
    templateUrl: 'about/about.html',
    controller: 'AboutCtrl'
  });
 }])

.controller('AboutCtrl', [function() {

}]);