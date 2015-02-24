//TODO: Remove this service because you are going to have to break up the services into single operations.
(function(){

 var app = angular.module("myApp.service",[]);
app.factory("jobservice",['$http','$log',function($http, $log){
    return {
        getJob:function(){
            ///TODO: Need to relace this url with script and parameters required for $scope.role, $scope.local to search for a job
           var promise= $http.get("http://localhost:8000/js/ajaxSearchjsonpCanada.json");
            return promise;
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
