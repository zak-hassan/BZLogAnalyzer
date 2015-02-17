(function () {

    var app = angular.module("myApp.directive.contactForm", [])
        .directive('topBanner', function () {
            return {
                templateUrl: "templates/topbanner.html",
                restrict: "E",
                replace: true
            };

        });

}());

