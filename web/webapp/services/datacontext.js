/******************
 * Object used for navigation pagination..
 *
 * @ Name: data services to make queries to the backend services and display search results.
 * @ Author: Zakeria Hassan
 * @ Usage: For working with config data
 *
 *****************/
(function () {
    var app = angular.module('myApp.service.datacontext', []);
    app.factory('datacontext', ['$http', function ($http) {
        // TODO: Put all data requests ...
        return {
            getJob: function (role, local, pagenum, addToJobList, sidebars) {
                $http.get("/js/ajaxSearchjsonpCanada.json").then(function (response) {
                    $("#pbar").show();
                    var data = response.data;
                    sidebars.totalJobs = data.TotalJobs;
                    sidebars.totalPages = data.TotalPages;
                    sidebars.jsummary = "Found " + data.TotalJobs + " positions with keyword " + role + " located in " + local;
                    sidebars.pagenum = pagenum;
                    if(sidebars.totalJobs>0){
                        sidebars.results=true;
                    }
                    angular.forEach(data, function (v, k) {
                        if (isNaN(k) != true) {
                            addToJobList(v["JobDetailURL"], v["CompanyName"], v["JobDate"],
                                v["JobLocation"], v["JobDetails"]);
                            $(".bar").css({
                                "width": "10%"
                            });
                        }
                        if (k === "sideBar") {
                            angular.forEach(v.Companies, function (sidebarValue, sidebarKey) {
                                sidebars.companies.push({
                                    compurl: "/cxf/search/company:" + sidebarKey + ",location:", //TODO: Add location here...
                                    compname: sidebarKey,
                                    compcount: sidebarValue
                                });
                            });
                            $(".bar").css({
                                "width": "60%"
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
                    $(".bar").css({
                        "width": "100%"
                    });
                    $("#pbar").hide();
                    $(".bar").css({
                        "width": "0%"
                    });
                }, function (error) {
                    //TODO: Should display a model on error
                });
            }
        };
    }]);
}());