

(function(){

    var app = angular.module("myApp.directive.contactForm",[])
    .directive('contactForm',function(){
        return {
            templateUrl: "templates/contactform.html",
            restrict: "E",
            replace: true
        };

    });

}());

  