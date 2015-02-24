'use strict';

(function(){

  var SearchCtrl=function($scope, PaginQueue, datacontext){
      $scope.country="Canada";
      $scope.next = function () {
          PaginQueue.pagin_next();
      }
      $scope.prev = function () {
          PaginQueue.pagin_prev();
      }
      $scope.validateSearch=function () {
          var role=$scope.role;
          var local=$scope.local;
          if (role.trim().length == 0 && local.trim().length == 0) {
              $("#err").modal('show'); // TODO: Create Angular Modal Service to popup dialogs with custom messages.
          } else {
              window.location.replace('http://' + location.host + "/search?keyword=" + encodeURIComponent(role) + "&local=" + encodeURIComponent(local));
          }
      };

      $scope.fetchResults=function(num){
          // TODO: Add logic to utilize data
          datacontext.getJob($scope.role,$scope.local, num).then(function(response){

              console.dir(response);
              /*                $("#title").empty();
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

               */




              return response;
          },function(error){

          })

      };

      $scope.setupSidebar=function(){
          // TODO: Add logic to setup the sidebar...
      };

      $scope.generateMap=function(){
          // TODO: Add logic to generate map...
      };
      $scope.map = { center: { latitude: 43, longitude: -79 }, zoom: 8 };

      var addMarker=function(latitude, longitude, title){
        return {
            latitude: latitude,
            longitude: longitude,
            title: title
        }
      };
      $scope.markers=[{
          latitude: 43.7075863,
          longitude:  -79.3957828,
          title: "Red Hat"
      }];

      $scope.sidebars=[];
      $scope.joblist=[];

      var addToJobList=function(u, t, p, l, s){
        $scope.joblist.push({
            url:u,
            title: t,
            postedon: p,
            locations: l,
            summary: s
        });
      };

      var addToSidebar=function( cu, cn,cc,  jtu,jtn, jtc ){
          $scope.sidebars.push({ compurl: cu,
                                compname: cn,
                                compcount:cc,
                                jtypeurl: jtu,
                                jtypename: jtn,
                                jtypecount:jtc
                             });
      };
addToSidebar("http://google.com","google",10, "http://google.com","google",10);
      addToSidebar("http://google.com","google",10, "http://google.com","google",10);
      addToSidebar("http://google.com","google",10, "http://google.com","google",10);
      addToJobList("http://google.com", "Software Engineer 1", "Feb 21 2015",
          "Toronto, Ontario", "Google Would love to hire an engineer who is a creative thinker....");
      addToJobList("http://google.com", "Software Engineer 2", "Feb 21 2015",
          "Toronto, Ontario", "Google Would love to hire an engineer who is a creative thinker....");
      addToJobList("http://google.com", "Software Engineer 3", "Feb 21 2015",
          "Toronto, Ontario", "Google Would love to hire an engineer who is a creative thinker....");
      addToJobList("http://google.com", "Software Engineer 4", "Feb 21 2015",
          "Toronto, Ontario", "Google Would love to hire an engineer who is a creative thinker....");
      addToJobList("http://google.com", "Software Engineer 5", "Feb 21 2015",
          "Toronto, Ontario", "Google Would love to hire an engineer who is a creative thinker....");
      addToJobList("http://google.com", "Software Engineer 6 ", "Feb 21 2015",
          "Toronto, Ontario", "Google Would love to hire an engineer who is a creative thinker....");
      addToJobList("http://google.com", "Software Engineer 7", "Feb 21 2015",
          "Toronto, Ontario", "Google Would love to hire an engineer who is a creative thinker....");
      addToJobList("http://google.com", "Software Engineer 8", "Feb 21 2015",
          "Toronto, Ontario", "Google Would love to hire an engineer who is a creative thinker....");
      addToJobList("http://google.com", "Software Engineer 9", "Feb 21 2015",
          "Toronto, Ontario", "Google Would love to hire an engineer who is a creative thinker....");
      addToJobList("http://google.com", "Software Engineer 10", "Feb 21 2015",
          "Toronto, Ontario", "Google Would love to hire an engineer who is a creative thinker....");

  };
  angular.module('myApp.search', ['ngRoute', 'myApp.service.PaginQueue', 'myApp.service.datacontext','uiGmapgoogle-maps'])
      .config(['$routeProvider','uiGmapGoogleMapApiProvider', function($routeProvider,uiGmapGoogleMapApiProvider) {
        $routeProvider.when('/search', {
          templateUrl: 'search/search.html',
          controller: 'SearchCtrl'
        });
          uiGmapGoogleMapApiProvider.configure({
              china: true
          });
      }]).controller('SearchCtrl', SearchCtrl)
      .directive('searchmorebutton',function(){
        return {
          templateUrl: "templates/SearchMoreButton.html",
          restrict: "E",
          scope:{
            company : "=",
            loc: "="
          },
          replace: true
        };

      }).directive('jobposts',function(){
          return {
              templateUrl: "templates/jobpost.html",
              restrict: "E",
              replace: true
          }
      })
      .directive('socialmedia',function(){
          return {
            templateUrl: "templates/socialmediabuttons.html",
            restrict: "E",
            scope:{
              company : "=",
              loc: "="
            },
            replace: true
          };

  }).directive('sidebar',function(){
          return {
              templateUrl: "templates/sidebar.html",
              restrict: "E",
              replace: true
          };

      });;

}())
