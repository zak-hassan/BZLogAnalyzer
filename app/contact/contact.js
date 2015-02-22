'use strict';
(function () {

  var ContactCtrl=function($scope, $interval){

    $scope.alerts = [];

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    var validate=function(){
      //TODO: Do some validation.
      return true;
    };

     $scope.sendMail=function(name, email, msg ){

      if(validate(name, email, msg)){
      console.log("Name " + name + " email "+ email + " message "+msg);
      $.sticky("We found jobs", {'speed' : 'fast',  'duplicates' : true, 'autoclose' : 10000 ,type: "st-success"});
       $scope.alerts.push( { type: 'success', msg: "Success!. Your message has been sent." });
        $interval(function(){
          $scope.alerts.pop();
        },10000);

      }

    };

  };

angular.module('myApp.contact', ['ngRoute','myApp.directive.contactForm','myApp.directive.topBanner', 'ui.bootstrap'])



.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contact', {
    templateUrl: 'contact/contact.html',
    controller: 'ContactCtrl'
  });
}])
.controller('ContactCtrl', ContactCtrl);

}());