//TODO: Remove this service because you are going to have to break up the services into single operations.
(function(){

 var app = angular.module("myApp.service",[]);
app.factory("jobservice",['$http','$log',function($http, $log){
    return {
        getJob:function(){
            $http.get("http://localhost:8000/js/ajaxSearchjsonpCanada.json").then(function(response){
                console.dir(response);
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
