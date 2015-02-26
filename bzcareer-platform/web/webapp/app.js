'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.search',
  'myApp.contact',
  'myApp.about',
  'myApp.maps',
  'myApp.service',
    'ui.bootstrap'
]).
config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
$routeProvider.otherwise({redirectTo: '/'});
//  $locationProvider.html5Mode(true);

}]);
