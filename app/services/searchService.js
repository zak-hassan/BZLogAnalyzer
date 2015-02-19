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

        }
    };

}]);

}());



"use strict";


// TODO: Port this javascript into angular.js

if (typeof String.prototype.removeAll !== 'function') {
    String.prototype.removeAll = function (arg) {
        var temp = this.toString();
        do {
            temp = temp.replace(arg, "");
        } while (temp.indexOf(arg) > -1);
        return temp;
    };
}

String.prototype.initCap = function () {
    var temp = this.toString().toLowerCase();
    if (temp) {
        return temp[0].toUpperCase() + temp.substring(1);
    } else {
        return this.toString();
    }
};

if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    };
}

function addEventHandler(oNode, sEvt, fnHandler, bCapture) {
    if (typeof(window.event) != "undefined")
        oNode.attachEvent("on" + sEvt, fnHandler);
    else
        oNode.addEventListener(sEvt, fnHandler, true);
}


function removeEventHandler(oNode, sEvt, fnHandler, bCapture) {
    if (typeof(window.event) != "undefined")
        oNode.detachEvent("on" + sEvt, fnHandler);
    else
        oNode.removeEventListener(sEvt, fnHandler, true);
}
(function () {
    window.addEventListener("resize", resizeByScreen, true);
})();

//For mobile detection:
function resizeByScreen() {

    //Adjusting web app for screen resolution

    if (window.innerWidth > 1200) {
        $("#searchField").removeClass();
        $("#searchField").addClass("span10");
        $("#page-title").css({"height": "130px"});
        $("#logoWrapper").removeClass();
        $("#footerWrapper").addClass("footer-flot-bottom");
        $("#social-list").addClass("inline");
        $("#mobile-message").empty();
        $("#social-media").show();
    } else if (window.innerWidth < 1200 && window.innerWidth > 950) {
        $("#searchField").removeClass();
        $("#searchField").addClass("span8");
        $("#page-title").css({"height": "130px"});
        $("#logoWrapper").removeClass();
        $("#social-list").addClass("inline");
        $("#footerWrapper").addClass("footer-flot-bottom");
        $("#mobile-message").empty();
        $("#social-media").show();
    } else if (window.innerWidth < 950 && window.innerWidth > 765) {
        $("#searchField").removeClass();
        $("#searchField").addClass("span7");
        $("#page-title").css({"height": "130px"});
        $("#logoWrapper").removeClass();
        $("#footerWrapper").addClass("footer-flot-bottom");
        $("#social-list").addClass("inline");
        $("#mobile-message").empty();
        $("#social-media").show();
    } else if (window.innerWidth < 765) {
        $("#logoWrapper").addClass("row");
        $("#searchField").removeClass();
        $("#page-title").css({"height": "500px"});
        $("body").css({"min-height": "450px"});
        $("#social-list").removeClass();
        $("#footerWrapper").removeClass();
        $("#social-media").hide();
    } else {
        $("#searchField").removeClass();
        $("#logoWrapper").removeClass();
        $("#social-list").addClass("inline");
        $("#footerWrapper").addClass("footer-flot-bottom");
        $("#mobile-message").empty();
        $("#social-media").show();
    }

}
/*********************
 * Global Variables.
 *********************/
var d = {},
    f = {},
    alink, colum = 1,
    totalPages, less = false;

//TODO: Turn these into ng-click functions and import the PaginQueue Service ..
var next = function () {
    PaginQueue.pagin_next();
}
var prev = function () {
    PaginQueue.pagin_prev();
}



// TODO: Turn this into a datacontext service that will leverage $http instead of using plain jQuery
$(document).ready(function () {
    //THIS CODE RUNS IF THERE THE MISSION IS TO LOCATION PARAMETERS
    if (location.search.indexOf("&local") == -1 && location.search.indexOf("keyword") != -1) {
        location.replace(location.href + "&local=")
    }
    //SETTING UP AJAX ERROR HANDLING
    resizeByScreen();
    $("#pbar").hide();
    $(".pagination").hide();
    var ajkey = ajaxQstr.getKeyValPair().keyword;
    var ajloc = ajaxQstr.getKeyValPair().local;
    if (ajaxQstr.isQueryStr()) {
        if (ajkey.trim() === "" && ajloc.trim() === "") {
            $("#json").append("<b><h4>Please enter a keyword or a location to search</b></h4>");

        } else {
            if (ajkey.indexOf("%20"))
                ajkey = ajkey.replace("%20", " ");

            if (ajloc.indexOf("%20"))
                ajloc = ajloc.replace("%20", " ");

            $("#role").val(ajkey);
            $("#location").val(ajloc);
            var rolekeys;
            rolekeys = $("#role").val().split(" ");
            for (var i = 0; i < rolekeys.length; i++) {
                rolekeys[i] = rolekeys[i].initCap();
            }
            $("#role").val(rolekeys.join(" "));
            var localkey = $("#location").val().split(" ");
            for (var i = 0; i < localkey.length; i++) {
                localkey[i] = localkey[i].initCap();
            }
            $("#location").val(localkey.join(" "));
            fetchResults(1);
        }

    }

    $("#searchbtn").click();
    $("#page").css({
        "padding-bottom": "90px"
    });

});

//TODO: Move this logic to PaginQueue Service
function hidePaginationPrevNext() {
    if (PaginQueue.isFirst()) {
        $("#prev").addClass("off");
    }
    if (PaginQueue.isLast()) {
        $("#next").addClass("off");
    }
    if (!PaginQueue.isFirst() && $("#prev").hasClass("off")) {
        $("#prev").removeClass("off");
    }
    if (!PaginQueue.isLast() && $("#next").hasClass("off")) {
        $("#next").removeClass("off");
    }
}

//TODO: Create Sidebar directive and use ng-repeat ..
var generateSideBar = function (obj, flag, tag) {
    var sidebar = [], list = "";
    $.each(obj, function (j, v) {
        sidebar.push("<li><a href='" + location.pathname + "?keyword=" + ajaxQstr.getKeyValPair().keyword + ";" + tag + ":" + j + "&local=" + ajaxQstr.getKeyValPair().local + "'>" + j + "(" + v + ")</a></li>");
    });
    if (flag) {
        for (var i = 0; i < sidebar.length; i++) {
            list += sidebar[i];
        }
        return list;
    } else {
        if (sidebar.length >= 10) {
            $("#removeFilter").hide();
            for (var i = 0; i < 10; i++) {
                list += sidebar[i];
            }
            list += "<li><a class='post-entry' onclick='displayMoreSideBar();'><b>More</b></a></li>"
        } else {
            $("#removeFilter").show();
            for (var i = 0; i < sidebar.length; i++) {
                list += sidebar[i];
            }
        }
        return list;
    }
};

var displayMoreSideBar = function () {
    $("#CompanySBList").empty();
    $("#CompanySBList").append(generateSideBar(obj, true, 'company'));
};

var removeFilter = function () {
    if (ajaxQstr.getKeyValPair().keyword.split(";").length > 1) {
        window.location.replace(location.pathname + "?keyword=" + ajaxQstr.getKeyValPair().keyword.split(";")[0] + "&local=" + ajaxQstr.getKeyValPair().local);
    }
};

// TODO: Need to stop using global variables and use $scope instead for stuff like this 'obj'?
var obj;

// TODO: Move this code to datacontext service and
function fetchResults(col, companyFilter) {
    var parm = "isLocal=" + encodeURIComponent($("#location").val().trim()) + "&country=" + encodeURIComponent("<%-prefix.substr(0,2) %>");
    var r;
    $("body").css({"cursor": "wait"});

    $(".ad").hide();
    $("#Searchsum").hide();
    $("#pbar").fadeIn();
    $(".bar").css({
        "width": "20%"
    });
    $("#json").empty();
    $(".pagination").hide();
    $('#json').fadeOut('slow');
    $("#wrapper").css({
        "min-height": "500px"
    });
    var baseurl = "http://bzcareer.com/<%- script%>";
    var c = (companyFilter) ? companyFilter.trim() : "All";
    var r = ($("#role").val().trim().toLowerCase() == "") ? "" : $("#role").val().trim();
    //Added a line to handle empty input
    var l = ($("#location").val().trim().toLowerCase() == "") ? "<%-country %>" : $("#location").val().trim();
    r = r.initCap();

    var qparam = "company=" + encodeURIComponent(c) + "&role=" + encodeURIComponent(r) + "&location=" + encodeURIComponent(l);

    if (col) {
        colum = col;
        qparam += "&page=" + col;
        alink = $("#page a");

        $(".bar").css({
            "width": "40%"
        });
        //Calling object to move the link..
        if (PaginQueue.isHead()) {
            PaginQueue.moveCurLine(0);
        } else {
            PaginQueue.moveCurLine(PaginQueue.getPos(PaginQueue.getPageNum() - 1))
        }
    }

    var request = $.jsonp({
        url: baseurl,
        type: "GET",
        dataType: "jsonp",
        //jsonpCallback: "_testcb",
        callbackParameter: "callback",
        cache: true,
        data: qparam,
        success: function (data) {
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
                });

                //Last but not lest...
                if (!less && PaginQueue.getTotalPages() < 10) {
                    less = true;
                    PaginQueue.setupNav();
                }

                //NEED TO CALL THIS FOR LINKEDIN TO RESEND THE BUTTONS.
                $(".ad").show();
                $("#Searchsum").show();
                $("#Searchsum").empty();
                if ($("#role").val().split(";").length < 2) {
                    $("#Searchsum").append("<ul class='inline'><li><span class='label label-inverse'> Page " + PaginQueue.getPageNum() + " of " + PaginQueue.getTotalPages() + " pages</span> </li><li>" + "<h1 style='font-size: 20px;'>Found " + data.TotalJobs + " " + $("#role").val() + " Jobs </h1></li></ul><br />");
                    $("title").html($("#role").val() + " Jobs in " + $("#location").val() + " | BZCareer.com Found " + data.TotalJobs + " " + $("#role").val() + " Jobs");

                } else {
                    var pfmsg = $("#role").val().split(";")[0];
                    $("#Searchsum").append("<ul class='inline'><li><span class='label label-inverse'> Page " + PaginQueue.getPageNum() + " of " + PaginQueue.getTotalPages() + " pages</span> </li><li>" + "<h1 style='font-size: 20px;'>Found " + data.TotalJobs + " " + $("#role").val().split(";")[0] + " jobs at " + $("#role").val().split(";")[1].split(":")[1].toUpperCase() + "</h1></li></ul><br />");
                    var comp = "";
                    if ($("#role").val().split(";")[1].split(":")[0].toUpperCase() == "COMPANY") {
                        comp = " at " + $("#role").val().split(";")[1].split(":")[1].toUpperCase();
                    }

                    $("title").html($("#role").val().split(";")[0] + " Jobs in " + $("#location").val() + " | BZCareer.com Found " + data.TotalJobs + $("#role").val().split(";")[0] + comp + " Jobs");

                }
                $("a").tooltip('hide');
                $("body").css({"cursor": ""});
                $(".blog-sidebar").show();
                hidePaginationPrevNext();

            } else {

                $("body").css({"cursor": ""});
                $("#json").append(data.Error);
                $("#json").show();
                $("#pbar").hide();
                $('#json').fadeIn('slow');
            }
        },
        error: function () {
            $("#err").modal('show');
            $("body").css({"cursor": ""});
            $("#json").append(d);
            $("#json").show();
            $("#pbar").hide();
        }

    });
    //We return false because we don't want a redirect..
    $("#json").show();
    return;
}
; //This is for the document.ready...
function googlePlusBtn() {
    (function () {
        var po = document.createElement('script');
        po.type = 'text/javascript';
        po.async = true;
        po.src = 'https://apis.google.com/js/plusone.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(po, s);
    })();

}

function twitterBtn() {

    !function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (!d.getElementById(id)) {
            js = d.createElement(s);
            js.id = id;
            js.src = "//platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);
        }
    }(document, "script", "twitter-wjs");
    twttr.ready(function (twttr) {
        twttr.widgets.load();
    });
}
function facebookBtn() {
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

}
function genEmailBtn(company, jId, key, loc, jtitle) {
    var btn = '<form action="referme" method="get"><a href="#myModal" role="button" style="margin-bottom:10px;margin-right:30px;" class="btn btn-beoro-7" data-toggle="modal"><i class="icsw16-mail"></i> Email Friend</a>' +
        '<div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
        '<div class="modal-header">' + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>' +
        '<h3 id="myModalLabel">Share with Friend</h3>' + '</div>' + '<div class="modal-body">' + '<p>' +
        '<label for="name">Friend Name:</label><input type="text" name="name" />' +
        ' <label for="email">Email:</label><input type="text" name="email" />' +
        '<input type="hidden" name="id" value="' + jId + '" />' +
        '<input type="hidden" name="keyword" value="' + key + '" />' +
        '<input type="hidden" name="location" value="' + loc + '" />' +
        '<input type="hidden" name="company" value="' + company + '" />' +
        '<input type="hidden" name="jtitle" value="' + jtitle + '" />' +
        ' </p>' + '</div>' +
        '<div class="modal-footer">' + '<button class="btn" data-dismiss="modal" aria-hidden="true">Cancel</button>' + '<input type="submit" class="btn btn-primary" value="Send" /></form>' + ' </div>' + '</div>';
    return btn;
}
function ClosePopup() {
    $("#err").modal('hide');
}
function genSaveBtn(title, url) {
    var btn = '<a href="#myModal" role="button" class="btn" data-toggle="modal">Save Job</a>' + '<div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' + '<div class="modal-header">' + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>' + '<h3 id="myModalLabel">Share with Friend</h3>' + '</div>' + '<div class="modal-body">' + '<p>' +
        'Bookmarked Job:' + title + " Url:" + url + '</p>' + '</div>' +
        '<div class="modal-footer">' + '<button class="btn" data-dismiss="modal" aria-hidden="true">Cancel</button>' + '<button class="btn btn-primary">Send</button>' + ' </div>' + '</div>';
    return btn;
}

//Code to bookmark page:
function bookmark(title, url) {
    if (document.all) { // ie
        window.external.AddFavorite(url, title);
    }
    else if (window.sidebar) { // firefox
        window.sidebar.addPanel(title, url, "");
    }
    else if (window.opera && window.print) { // opera
        var elem = document.createElement('a');
        elem.setAttribute('href', url);
        elem.setAttribute('title', title);
        elem.setAttribute('rel', 'sidebar');
        elem.click();
    }
}



// TODO: Turn this into a directive that will take the following inputs ...
function generateJPost(jID, jTitle, jLocation, jDate, jobApplyLink, jobDetailLink, company, companyName, JobSummary) {

    //NOTE: jID will be used to construct the job apply button...
    // jLocation will be used for locations of the job..
    if (!jTitle) {
        return "";
    }
    if (jTitle.length > 50)
        jTitle = jTitle.substring(0, 50) + "... ";
    if (!jLocation) {
        jLocation = " Please see job post for more details."
    }

    if (jLocation.length > 31)
        jLocation = jLocation.substring(0, 21) + "... More locations";
    if (!jDate) {
        jDate = "";
    }
    var jobinfo;
    var jobService = "https://54.235.212.123/ajaxjobsummary.php";
    var jobparam = "company=" + company + "&id=" + jID + "&title=" + jTitle;
    var placeholder = company + "_" + jID;
    try {

    } catch (err) {
    }

    var url = "https://www.bzcareer.com/ajaxjobdetail.php?company=" + company + "&id=" + jID + "&title=" + jTitle;
    var div = "<!-- Post --><div class=\"content\">" + "<div class=\"alpha fourteen columns\"><div class=\"post-title\">" +
        "<h2><a target=\"_blank\" href='/SeeJob?job=" + encodeURIComponent(jobDetailLink) + "'>" + jTitle.removeAll("*") +
        "</a></h2></div></div><div class=\"alpha omega three columns\"><div class=\"post-date\">" + "<h5>" + companyName + "</h5><br />" +
        jDate + "</div></div><div class=\"alpha eight columns post-content\"><div class=''><div class=\"post-desc\"><blockquote><p>" +
        " Location: " + jLocation + "</p>" + "<cite title='Source Title'>" + "<div id='" + placeholder + "'>" + JobSummary + "</div>" +
        "</cite>" +
        "</blockquote>" +
        "<a class=\"post-entry\" href='/SeeJob?job=" + encodeURIComponent(jobDetailLink) + "' target=\"_blank\"> " +
        "Click here for more details</a>" +
        "</div></div><div class=\"post-meta\"><ul class='inline'><li>" +
        '<li><a target="_blank" href="http://www.newsvine.com/_tools/seed&save?u=http://www.bzcareer.com/SeeJob?job=' + encodeURIComponent(jobDetailLink) + '&h=' + $("#role").val() + ' job openings available"><img alt="newsvine share button" src="/app/images/social_icons/newsvine.png" ></a></li>' +
        '<li><a target="_blank" href="http://www.tumblr.com/share?v=3&u=' + encodeURIComponent('http://www.bzcareer.com/SeeJob?job=' + jobDetailLink) + '&t=' + $("#role").val() + ' job openings available"><img alt="tumblr share button" src="/app/images/social_icons/tumblr.png"></a></li>' +
        '<li><a target="_blank" href="http://digg.com/submit?phase=2&url=http://www.bzcareer.com/SeeJob?job=' + encodeURIComponent(jobDetailLink) + '&title=' + $("#role").val() + ' job openings available"><img alt="digg share button" src="/app/images/social_icons/digg.png" ></a></li>' +
        '<li><a target="_blank" href="http://www.facebook.com/share.php?u=http://www.bzcareer.com/SeeJob?job=' + encodeURIComponent(jobDetailLink) + '&title=' + $("title").html() + '"><img alt="facebook share button" src="/app/images/social_icons/facebook.png"></a></li>' +
        '<li><a target="_blank" href="https://twitter.com/share"  class="twitter-share-button" data-url="http://www.bzcareer.com/SeeJob?job=' + encodeURIComponent(jobDetailLink) + '"><img alt="twitter share button" src="/app/images/social_icons/twitter.png" /></a></li>' +
        "<li><a href='https://plus.google.com/share?url=http://www.bzcareer.com/SeeJob?job=" + encodeURIComponent(jobDetailLink) + "' onclick=\"javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;\"><img alt='google+ share button' src=\"/images/social_icons/googleplus.png\" alt=\"Share on Google+\"/></a></li>" +
        '<li><a  target="_blank"  href="http://www.linkedin.com/shareArticle?mini=true&url=http://www.bzcareer.com/SeeJob?job=' + encodeURIComponent(jobDetailLink) + '&title=' + jTitle + '&summary=Found ' + jTitle + ' job opening with ' + companyName + ' in http%3A%2F%2Fwww.bzcareer.com.&source=http%3A%2F%2Fwww.bzcareer.com"><img src="/app/images/social_icons/linkedin.png" /></a' + "></li>"
    "</ul>" +
    "</div></div></div><div class=\"clearfix\"></div><hr>";

    return div;

}
//TODO: Create a Directive for generate more button . Finished Creating the directive and now need to test it! search.js
var generateMoreButton = function (company, loc, flag) {
    var btn = "";
    if (flag) {
        btn = "<td><span style='vertical-align:bottom;'><a href=\"#\">" +
        '<span class="label label-info"><a class="btn btn-beoro-7 disabled"  ' +
        'style="margin-bottom:10px" disabled="disabled" href="search?keyword=Company:%20' +
        company + '&local=' + loc + '">Find more ' + company + ' jobs</a></span></a></span></td>';
    }
    return btn;
}

// TODO: Move this code to the datacontext as a method to invoke
var filterByCompany = function (company) {
    fetchResults(1, company);
}

// TODO: I don't know why this code is here frankly
(function () {
    if (location.pathname == "/search") {
        location.replace(location.origin + "/CA" + location.pathname + location.search);
    }
})();

