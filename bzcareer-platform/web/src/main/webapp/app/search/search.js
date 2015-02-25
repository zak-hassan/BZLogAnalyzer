'use strict';
(function () {
    var SearchCtrl = function ($scope, PaginQueue, datacontext) {
        $scope.country = "Canada";
        $scope.sidebars = {
            companies: [],
            jobtypes: []
        };
        $scope.pbar = "60";
        $scope.next = function () {
            PaginQueue.pagin_next();
        }
        $scope.prev = function () {
            PaginQueue.pagin_prev();
        }
        $scope.validateSearch = function () {
            var role = $scope.role;
            var local = $scope.local;
            if (role.trim().length == 0 && local.trim().length == 0) {
                $("#err").modal('show'); // TODO: Create Angular Modal Service to popup dialogs with custom messages.
            } else {
                //TODO: replace with angular $location ....
                window.location.replace('http://' + location.host + "/search?keyword=" + encodeURIComponent(role) + "&local=" + encodeURIComponent(local));
            }
        };
        $scope.fetchResults = function (num) {
            num = num || 1;
            datacontext.getJob($scope.role, $scope.local, num, addToJobList, $scope.sidebars);
        };

        $scope.map = {center: {latitude: 43, longitude: -79}, zoom: 8};

        var addMarker = function (latitude, longitude, title) {
            return {
                latitude: latitude,
                longitude: longitude,
                title: title
            }
        };

        $scope.markers = [{
            latitude: 43.7075863,
            longitude: -79.3957828,
            title: "Red Hat"
        }];
        $scope.joblist = [];
        var addToJobList = function (u, t, p, l, s) {
            $scope.joblist.push({
                url: u,
                title: t,
                postedon: p,
                locations: l,
                summary: s
            });
        };
        var addToSidebar = function (cu, cn, cc, jtu, jtn, jtc) {
            $scope.sidebars.push({
                compurl: cu,
                compname: cn,
                compcount: cc,
                jtypeurl: jtu,
                jtypename: jtn,
                jtypecount: jtc
            });
        };
    };
    angular.module('myApp.search', ['ngRoute', 'myApp.service.PaginQueue', 'myApp.service.datacontext', 'ui.bootstrap']) //'uiGmapgoogle-maps'])
        .config(['$routeProvider', //'uiGmapGoogleMapApiProvider',
            function ($routeProvider) { // uiGmapGoogleMapApiProvider) {
                $routeProvider.when('/search', {
                    templateUrl: 'search/search.html',
                    controller: 'SearchCtrl'
                });
                //uiGmapGoogleMapApiProvider.configure({
                //    china: true
                //});
            }]).controller('SearchCtrl', SearchCtrl)
        .directive('searchmorebutton', function () {
            return {
                templateUrl: "templates/SearchMoreButton.html",
                restrict: "E",
                scope: {
                    company: "=",
                    loc: "="
                },
                replace: true
            };
        }).directive('jobposts', function () {
            return {
                templateUrl: "templates/jobpost.html",
                restrict: "E",
                replace: true
            }
        })
        .directive('socialmedia', function () {
            return {
                templateUrl: "templates/socialmediabuttons.html",
                restrict: "E",
                scope: {
                    company: "=",
                    loc: "="
                },
                replace: true
            };

        }).directive('sidebar', function () {
            return {
                templateUrl: "templates/sidebar.html",
                restrict: "E",
                replace: true
            };
        });
}())
