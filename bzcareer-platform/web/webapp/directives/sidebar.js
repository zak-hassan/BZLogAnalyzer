

(function(){

    var app = angular.module("myApp.directive.sidebar",[])
        .directive('sidebar',function(){
            return {
                templateUrl: "templates/sidebar.html.html",
                restrict: "E",
                replace: true
            };

        });

}());

  