'use strict';
(function () {


angular.module('myApp.contact', ['ngRoute','myApp.directive.contactForm','myApp.directive.topBanner'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contact', {
    templateUrl: 'contact/contact.html',
    controller: 'ContactCtrl'
  });
}])
.controller('ContactCtrl', [function() {

}]);

}());