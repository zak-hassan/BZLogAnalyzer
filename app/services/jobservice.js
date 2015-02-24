//TODO: Remove this service because you are going to have to break up the services into single operations.
(function(){

 var app = angular.module("myApp.service",[]);
app.factory("jobservice",['$http','$log',function($http, $log){
    return {
        getJob:function(){
            ///TODO: Need to relace this url with script and parameters required for $scope.role, $scope.local to search for a job
            $http.get("http://localhost:8000/js/ajaxSearchjsonpCanada.json").then(function(response){

                $("#title").empty();
                //Loading data into sidebar..
                obj = data.sideBar.Companies;
                $("#CompanySBList").empty();
                $("#CompanySBList").append(generateSideBar(obj, false, 'company'));
                $("#JobTypeSBList").empty();
                $("#JobTypeSBList").append(generateSideBar(data.sideBar.JobType, true, 'jobtype'));

                $("#title").append(r + " Jobs in " + l + " | BZCareer");
                $("#json").empty();

                if (!data.hasOwnProperty('Error')) {
                    if (window.innerWidth < 750) {
                        $('html, body').animate({scrollTop: 500}, 1500, 'easeInSine');
                    }

                    d = data;
                    var counter = 0;
                    var container = Array();
                    $(".bar").css({
                        "width": "60%"
                    });
                    //This loads the whole json object into memory and loops through the individual element
                    $.each(data, function (key, value) {
                        //Set the company..
                        if (key == 'TotalPages') {
                            $(".bar").css({
                                "width": "80%"
                            });
                            totalPages = value;
                        }
                        else {
                            var results = Array();
                            //Initializing variables:
                            var jID, jTitle, jLocation, jDate, jdesc, jobApplyLink, urlApply, urlDetail, company, jType, companyName, JobSummary;
                            //setting up summary of results for sidebar.
                            companyName = value.CompanyName;
                            company = value.company;
                            urlApply = value.JobApplyURL;
                            urlDetail = value.JobDetailURL;
                            JobSummary = value.JobDetails;
                            jTitle = value.JobTitle;

                            if (value.JobLocation) {
                                $(".bar").css({
                                    "width": "90%"
                                });
                                jLocation = value.JobLocation;
                            }
                            jID = value.JobID1;
                            jType = value.JobType;
                            if (value.JobDate) jDate = "Posted on : " + value.JobDate;
                            //This means if its the last element...
                            results.push(generateJPost(jID, jTitle, jLocation, jDate, urlApply, urlDetail, company, companyName, JobSummary));
                            $.each(results, function (ind, res) {
                                d = document.createElement('div');
                                $(d).attr("class", "jobrow");
                                $(d).append(res);
                                $("#json").append(d);

                                $(".bar").css({
                                    "width": "100%"
                                });
                                $("#search-summary").empty();
                                $("#search-summary").append(" " + $("#role").val() + " Jobs");
                                $('#json').fadeIn('slow');
                                $("#pbar").fadeOut();
                                $(".bar").css({
                                    "width": "0%"
                                });
                                if (IN.parse) {
                                    IN.parse();
                                }
                                if ($("#bodyframe").height() > window.innerHeight) {
                                    $("#footerWrapper").removeClass("footer-flot-bottom");
                                }
                                $(".pagination").fadeIn("slow");
                            });
                        }






                return response;
            },function(error){

            })

        },
        getSidebar:function(){
            console.log("GET Sidebar");
            return "sidebar";
        },
        getMap:function(){
            console.log("GET Map");
            return "maps";

        },
        redirectToSearchPage:function(role, local, country){

            if (country == "Canada") {
                window.location.replace("http://www.bzcareer.com/CA/search?keyword=" + role + "&local=" + local);
            } else {
                window.location.replace("http://www.bzcareer.com/search?keyword=" + role + "&local=" + local);
            }
        }
    };

}]);

}());
