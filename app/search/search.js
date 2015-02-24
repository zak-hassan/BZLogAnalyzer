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
              if(!num){
                  num=1;
          }


          datacontext.getJob($scope.role,$scope.local, num).then(function(response){

              console.dir(response);

                      var data= response.data;
              angular.forEach(data,function(v,k){
                    console.log("key: "+JSON.stringify(k));
                  console.log("value: "+JSON.stringify(v));

                  if(k.isNumber()){
                  //TODO: Setup JobPosts:
                  addToJobList(v["JobDetailURL"], v["CompanyName"], v["JobDate"],
                      v["JobLocation"], v["JobDetails"]);

                  }
                    if(k==="sideBar"){
                        angular.forEach(v.companies,function(sidebarValue, sidebarKey){
                            //TODO: Setup Sidebar:
                            addToSidebar("http://google.com",sidebarKey,sidebarValue, "http://google.com","google",10);

                        });
                    }


              });


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
