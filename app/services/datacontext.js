/******************
 * Object used for navigation pagination..
 *
 * @ Name: config
 * @ Author: Zakeria Hassan
 * @ Usage: For working with config data
 *
 *****************/

(function(){

    var app = angular.module("myApp.service.datacontext",[]);
    app.factory("datacontext",['$http',function($http){
        // TODO: Put all data requests ...
        return {
            getJob:function(){
                $http.get("http://localhost:8000/js/ajaxSearchjsonpCanada.json").then(function(response){
                    console.dir(response);
                    return response;
                },function(error){

                })
            }
        };
    }]);

}());

