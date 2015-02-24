/******************
 * Object used for navigation pagination..
 *
 * @ Name: config
 * @ Author: Zakeria Hassan
 * @ Usage: For working with config data
 *
 *****************/

(function(){

    var app = angular.module('myApp.service.datacontext',[]);
    app.factory('datacontext',['$http',function($http){
        // TODO: Put all data requests ...
        return {
            getJob:function(role, local, pagenum, addToJobList,sidebars){
               var promise= $http.get("http://localhost:8000/js/ajaxSearchjsonpCanada.json").then(function (response) {
                    var data = response.data;
                    angular.forEach(data, function (v, k) {
                        if (isNaN(k) != true) {
                            addToJobList(v["JobDetailURL"], v["CompanyName"], v["JobDate"],
                                v["JobLocation"], v["JobDetails"]);
                        }
                        if (k === "sideBar") {
                            angular.forEach(v.Companies, function (sidebarValue, sidebarKey) {
                                $scope.sidebars.companies.push({
                                    compurl: "/cxf/search/company:" + sidebarKey + ",location:", //TODO: Add location here...
                                    compname: sidebarKey,
                                    compcount: sidebarValue
                                });

                            });
                            angular.forEach(v.JobType, function (sidebarTypeValue, sidebarTypeKey) {
                                 sidebars.jobtypes.push({
                                    jtypeurl: "/cxf/search/jobtype:" + sidebarTypeKey + ",location:", //TODO: Add location here.
                                    jtypename: sidebarTypeKey,
                                    jtypecount: sidebarTypeValue
                                });

                            });
                        }

                    });
                }, function (error) {
                    //TODO: Should display a model on error
                });


            }

        };
    }]);

}());

