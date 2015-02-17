/*
Service for javascript language extentions
 */


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

            }
        };

    }]);

}());


