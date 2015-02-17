(function () {

    var app = angular.module("myApp.directive.topBanner", [])
        .directive('topBanner', function () {
            return {
                templateUrl: "templates/topbanner.html",
                restrict: "E",
                replace: true
            };

        });

}());

