'use strict';

(function () {

    var HomeCtrl = function ($scope, $location, jobservice, $http, $log) {
        $scope.country = "Canada";
        $scope.title = "";
        $scope.meta = "";
        $scope.prefix = "CA/";
         $scope.fetchSearch = function fetchSearch() {

/*            var role = $scope.role || "";
            var local = $scope.location || "";
            if ($scope.country == "Canada") {
                window.location.replace("http://www.bzcareer.com/CA/search?keyword=" + role + "&local=" + local);
            } else {
                window.location.replace("http://www.bzcareer.com/search?keyword=" + role + "&local=" + local);
            }
 */
           jobservice.getSidebar();
             jobservice.getJob();
             jobservice.getMap();
        };

        };

    angular.module('myApp.home', ['ngRoute','myApp.service'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'home/home.html',
                controller: 'HomeCtrl'
            });
            // TODO: Configure the url to use '$locationProvider.html5mode(true)'
        }]).controller('HomeCtrl', HomeCtrl)
        .directive('bzfeaturebox1', function () {
            return {
                templateUrl: "templates/featurebox1.html",
                restrict: "E",
                replace: true
            }
        }).directive('bzfeaturebox2', function () {
            return {
                templateUrl: "templates/featurebox2.html",
                restrict: "E",
                replace: true
            }
        }).directive('bzfeaturebox3', function () {
            return {
                templateUrl: "templates/featurebox3.html",
                restrict: "E",
                replace: true
            }
        }).directive('bzsearchbox', function () {
            return {
                templateUrl: "templates/searchbox.html",
                restrict: "E",
                replace: true
            }
        });

}());
