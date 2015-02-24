'use strict';

(function () {

    var HomeCtrl = function ($scope, jobservice, $http, $log) {
        $scope.country = "Canada";
        $scope.title = "";
        $scope.meta = "";
        $scope.prefix = "CA/";
        $scope.fetchSearch =function(){
            jobservice.redirectToSearchPage($scope.role, $scope.local, $scope.country);
            //console.log("Done! role: "+$scope.role+" local: "+$scope.local+" country: "+$scope.country);
        }
    };

    angular.module('myApp.home', ['ngRoute','myApp.service','ui.bootstrap'])
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
        }).directive('autoComplete', function($timeout) {
            return function(scope, iElement, iAttrs) {
                iElement.autocomplete({
                    source: scope[iAttrs.uiItems],
                    select: function() {
                        $timeout(function() {
                            iElement.trigger('input');
                        }, 0);
                    }
                });
            };
        });




}());


