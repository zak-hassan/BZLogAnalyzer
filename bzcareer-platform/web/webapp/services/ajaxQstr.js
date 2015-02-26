/******************
 * Object used for navigation pagination..
 *
 * @ Name: ajaxQstr
 * @ Author: Zakeria Hassan
 * @ Usage: For working with the querystring and submitting search via query
 * string.
 *
 *****************/

(function(){

    var app = angular.module("myApp.service",[]);
    app.factory("ajaxQstr",[function(){

        return {

            getCurrentUrl: function () {
                return window.location.href;
            },
            isQueryStr: function () {
                return this.getCurrentUrl().indexOf("?") != -1;
            },
            getQueryString: function () {
                return this.getCurrentUrl().split("?")[1];
            },
            getKeyValPair: function () {
                try {
                    var json = {};
                    var keys = this.getQueryString().split("&");
                    for (var i = 0, len = keys.length; i < len; i++) {
                        var pair = keys[i].split("=");
                        var pairval = decodeURIComponent(pair[1]);
                        pairval = pairval.replace("+", " ");
                        json[pair[0]] = pairval;
                    }
                } catch (err) {
                }
                return json;
            }
        };


    }]);

}());

