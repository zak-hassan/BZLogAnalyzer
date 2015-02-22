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
            getJob:function(role, local, pagenum){
                $http.get("http://localhost:8000/js/ajaxSearchjsonpCanada.json?company=All&role="+role+"&location="+local+"&page="+pagenum+"&callback=_jqjsp").then(function(response){
                    console.dir(response);
                    return response;
                },function(error){

                });

            }

        };
    }]);

}());

