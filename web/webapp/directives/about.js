(function () {

    var app = angular.module("myApp.directive.about", [])
        .directive('about', function () {
            return {
                templateUrl: "templates/about.html",
                restrict: "E",
                replace: true
            };

        });

}());

