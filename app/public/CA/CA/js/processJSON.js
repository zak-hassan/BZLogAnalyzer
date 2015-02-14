/*************************************************************
 * @author: Zakeria Hassan
 * @usage: This is used TotalPages get ride all junk in a string.
 ***************************************************************/
"use strict";

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

/*********************
 * Global Variables.
 *********************/
var d = {},
    f = {},
    alink, colum = 1,
    totalPages, less = false;


/******************************************************
 * Object used for navigation pagination..
 *
 * @ Name: PaginQueue.
 * @ Author: Zakeria Hassan
 * @ Usage: For organizing pagination
 *
 * ******************************************************/

var PaginQueue = {
    isFirst: function () {
        return (this.getPageNum() == 1);
    },
    isLast: function () {
        return (this.getPageNum() == this.getTotalPages());
    },
    isHead: function () {
        return (Number($("#page a")[0].innerHTML) == this.getPageNum());
    },
    isTail: function () {
        return (Number($("#page a")[$("#page a").length - 1].innerHTML) == this.getPageNum());
    },
    isMin: function () {
        return (Number($("#page a")[0].innerHTML) == 1);
    },
    isMax: function () {
        return (Number($("#page a")[$("#page a").length - 1].innerHTML) == this.getTotalPages());
    },
    getPos: function (num) {
        return ((num % 10) == 0) ? 10 : (num % 10);
    },
    setupNav: function () {
        try {
            var start = 1;
            var end = this.getTotalPages();
            $("#page ul").empty();
            for (var i = start; i <= end; i++) {
                this.getPageLink(i);
            }
            this.moveCurLine(0);
        }
        catch (err) {}

    },
    moveCurLine: function (num) {
        if ($.find("#page a[class='current-page']").length) {
            $("#page a[class='current-page']")[0].className = "";
        }
        $("#page a")[num].className = "current-page";
    },
    getPageNum: function () {
        return (!colum) ? 1 : colum;
    },
    BackPaginate: function () {

        try {

            if (this.isFirst()) {
                throw "Error: You can not go back when in the first position";
            }
            console.log(" BackPagin -> PageNum : " + (this.getPageNum()));
            var start = (this.getPageNum() - 10) + 1;
            var end = this.getPageNum();

            if (this.isHead() && !this.isMin()) {
                start--;
                end--;
            }

            $("#page ul").empty();
            for (var i = start; i <= end; i++) {
                this.getPageLink(i);
            }
            // Set current page:
            this.moveCurLine($("#page a").length - 1);

        } catch (err) {
            console.log("Error: " + err);
        }

        // $("body").scrollTop(0);
        $("body").animate({
            scrollTop: '0px'
        }, 800);
    },
    getPageLink: function (num) {
        //      $("#page ul").append("<li><a onclick='fetchResults("+num+")' href='#"+num+"'>"+num+"</a></li>");
        $("#page ul").append("<li><a onclick='fetchResults(" + num + ")' >" + num + "</a></li>");

    },
    Paginate: function () {


        try {
            if (this.isMax()) {
                throw "This is the last item in the list sorry…";
            }

            $("#page ul").empty();
            var start = this.getPageNum();
            var end = this.getPageNum() + 10;
            start++;
            end++;

            if (end > this.getTotalPages()) {
                end = (end - this.getTotalPages()) + this.getPageNum();
            }

            for (var i = start; i < end; i++) {
                this.getPageLink(i);
            }

            this.moveCurLine(0);

        } catch (err) {
            console.log("Error: " + err);
        }

        //This used to scroll up the page when a user click the button...
        $("body").animate({
            scrollTop: '0px'
        }, 800);

    },
    getTotalPages: function () {
        return (!totalPages) ? 0 : totalPages;
    },
    pagin_prev: function () {
        console.log("Next:isMax(): " + this.isMax());
        console.log("Next:isTail(): " + this.isTail());
        console.log("Next:colum: " + (colum));
        console.log("Next:isTail(): " + this.isLast());
        try {

            if(this.isFirst())
                throw "Can not go previous at the first location";


        /*
          if (this.isFirst()) {
                $("#prev").addClass("off");
                throw "Can not go previous at the first location";
            } else {
                if($("#prev").hasClass("off")){
                    $("#prev").removeClass("off");
                }
            }
        */

            if (this.isHead()) {
                this.BackPaginate();
            }
            colum--;
            fetchResults(colum);

        } catch (err) {
            console.log("Error: " + err);
        }

    },
    pagin_next: function () {
        console.log("Next:isMax(): " + this.isMax());
        console.log("Next:isTail(): " + this.isTail());
        console.log("Next:colum: " + (colum));
        console.log("Next:isTail(): " + this.isLast());

        try {
            if (this.isLast())    // return ( this.getPageNum() == this.getTotalPages() );
          throw "End of pages.. can not select next";

            //TODO: You have to check if you are in the first position and then set the prev to off

/*            if (this.isLast()){    // return ( this.getPageNum() == this.getTotalPages() );
                $("#next").addClass("off");
            throw "End of pages.. can not select next";
            }else{
                if($("#next").hasClass("off")){
                  console.log("We are not in the last position");
                    $("#next").removeClass("off");
                }
            }
*/


            if (this.isTail()) {
                this.Paginate()
            }
            colum++;
            fetchResults(colum);


            //Catching exception
        } catch (err) {
            return console.log("Can not go next…");
        }
    },
};

var next = function () {
    PaginQueue.pagin_next();
}
var prev = function () {
    PaginQueue.pagin_prev();
}


/******************
 * Object used for navigation pagination..
 *
 * @ Name: ajaxQstr
 * @ Author: Zakeria Hassan
 * @ Usage: For working with the querystring and submitting search via query
 * string.
 *
 * ****************/


var ajaxQstr = {

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
                json[pair[0]] = pair[1];
            }

        } catch (err) {

        }

        return json;
    }

};



$(document).ready(function () {
    // Calling validation..
//SETTING UP AJAX ERROR HANDLING
/*
$.ajaxSetup({
error: function(jqXHR, exception) {
    if (jqXHR.status === 0) {
        alert('Not connect.\n Verify Network.');
    } else if (jqXHR.status == 404) {
        alert('Requested page not found. [404]');
    } else if (jqXHR.status == 500) {
        alert('Internal Server Error [500].');
    } else if (exception === 'parsererror') {
       alert('Requested JSON parse failed.');
    } else if (exception === 'timeout') {
        alert('Time out error.');
    } else if (exception === 'abort') {
         alert('Ajax request aborted.');
    } else {
        alert('Uncaught Error.\n' + jqXHR.responseText);
    }
    }
});
*/
    $("#pbar").hide();
    $(".pagination").hide();
    if (ajaxQstr.isQueryStr()) {

        var ajkey=decodeURI(ajaxQstr.getKeyValPair().keyword);
        var ajloc=decodeURI(ajaxQstr.getKeyValPair().local);
        if ( ajkey.toLowerCase() === "type a keyword" && ajloc.toLowerCase() === "type a location") {
       //  if ($("#role").val().toLowerCase() === "type a keyword" && $("#location").val().toLowerCase() === "type a location") {
            $("#json").append("<b><h4>Please enter a keyword or a location to search</b></h4>");

        }else{


            $("#role").val(ajkey);
            $("#location").val(ajloc);


            var rolekeys;
            if($("#role").val().indexOf("+")!=-1){
                rolekeys= $("#role").val().split("+");
            }else{
                rolekeys = $("#role").val().split(" ");
            }

            for (var i = 0; i < rolekeys.length; i++) {
                rolekeys[i] = rolekeys[i].initCap();
            }
            $("#role").val(rolekeys.join(" "));
            var localkey = $("#location").val().split(" ");
            for (var i = 0; i < localkey.length; i++) {
                localkey[i] = localkey[i].initCap();
            }
            $("#location").val(localkey.join(" "));
            console.log("clicked search button");
            fetchResults(1);
        }

    }
    $("#searchbtn").click(function () {

        window.location.replace('http://' + location.host + "/search?keyword=" + encodeURI($("#role").val()) + "&local=" + encodeURI($("#location").val()))
    });
    $("#page").css({
        "padding-bottom": "90px"
    });
    //$("footer").css({"left":"0", "position":"fixed",
    // "text-align":"center","bottom":"0",
    // "width":"100%","height":"70px"});
    $("footer").css({
        "text-align": "center",
        "bottom": "0",
        "width": "100%",
        "height": "70px",
        "margin":"0px",
        "padding":"0px"
    });

    //$("#json").css({"height":window.screen.availHeight-200});
    // $("#nav a")[1].id="current";
});




function fetchResults(col) {
    if(PaginQueue.isFirst()){
        $("#prev").addClass("off");
    }
    if(PaginQueue.isLast()){
        $("#next").addClass("off");
    }

    if(!PaginQueue.isFirst() && $("#prev").hasClass("off")){
        $("#prev").removeClass("off");
    }

    if(!PaginQueue.isLast() && $("#next").hasClass("off")){
        $("#next").removeClass("off");
    }

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
    // $("#wrapper").mask("Please wait... The search is in progress.");

    var baseurl = "http://54.235.212.123:8080/ajaxSearchjsonp.php";
    var c = ($("#company").val()) ? $("#company").val().trim() : "All";
    var r = ($("#role").val().trim().toLowerCase() == "type a keyword") ? "" : $("#role").val().trim();
    //Added a line to handle empty input
    var l = ($("#location").val().trim().toLowerCase() == "type a location" || $("#location").val().trim().toLowerCase() == "") ? "-1" : $("#location").val().trim();
    r = r.initCap();
    c = c.initCap();
    var qparam = "company=" + encodeURI(c) + "&role=" + encodeURI(r) + "&location=" + encodeURI(l);

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
    //console.log(url);
    // url="http://54.243.157.1/index.php/ajaxJob?role="+encodeURI($("#role").val())+"&page=1",
    console.log(qparam);
//    var request = $.ajax({
   var request = $.jsonp({
        url: baseurl,
        type: "GET",
        dataType: "jsonp",
       //jsonpCallback: "_testcb",
       callbackParameter: "callback",
        cache: true,
        data: qparam,
        success:processJson,
        error:function(){
            console.log("error occurred in your jsonp function..");
            $("#err").modal('show');
            /* statusCode: {
                $("#json").append(d);
                $("#json").show();
                $("#pbar").hide();
        },
        statusCode: {
            404: function () {
                alert("page not found");
            },
            500: function () {
                d = document.createElement('div');
        }*/
                $("#json").append(d);
                $("#json").show();
                $("#pbar").hide();
           // }
        }

    });
    //We return false because we don't want a redirect..
    return;
}; //This is for the document.ready...

            function processJson (data) {
            console.log(textStatus);
            $("#json").empty();
            d = data;
            var counter = 0;
            var container = Array();
            $(".bar").css({
                "width": "60%"
            });
            //This loads the whol222e json object into memory and loops through the individual element
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
                    var jID, jTitle, jLocation, jDate, jdesc, jobApplyLink, urlApply, urlDetail, company, jType;
                    //setting up summary of results for sidebar.
                    company = value.company;
                    urlApply = value.JobApplyURL;
                    urlDetail = value.JobDetailURL;
                    jTitle = value.JobTitle;
                    // jTitle =jTitle.removeAll("*");
                    // jTitle =jTitle.removeAll("\\");
                    if (value.JobLocation) {
                        $(".bar").css({
                            "width": "90%"
                        });
                        jLocation = value.JobLocation;
                        if (jLocation.length > 31) jLocation = jLocation.substring(0, 31) + "... ";
                    }
                    jID = value.JobID1;
                    jType = value.JobType;
                    if (value.JobDate) jDate = "Posted on : " + value.JobDate;
                    //This means if its the last element...
                    results.push(generateJPost(jID, jTitle, jLocation, jDate, urlApply, urlDetail, company));
                    $.each(results, function (ind, res) {
                        d = document.createElement('div');
                        $(d).attr("class", "jobrow");
                        $(d).append(res);
                        $("#json").append(d);

                        // $("#wrapper").unmask();
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
            $("#Searchsum").show();
            $("#Searchsum").empty();
            $("#Searchsum").append("<span class='label label-inverse'> Page " + PaginQueue.getPageNum() + " of " + PaginQueue.getTotalPages() + " pages</span>");
            //}//END OF TRY
        }
function genEmailBtn(company, jId, key, loc,jtitle) {
    var btn = '<form action="referme" method="get"><a href="#myModal" role="button" style="margin-bottom:10px;margin-right:30px;" class="btn btn-beoro-7" data-toggle="modal">Email Friend</a>' +
        '<div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
        '<div class="modal-header">' + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>' +
        '<h3 id="myModalLabel">Share with Friend</h3>' + '</div>' + '<div class="modal-body">' + '<p>' +
        '<label for="name">Friend Name:</label><input type="text" name="name" />' +
        ' <label for="email">Email:</label><input type="text" name="email" />' +
        '<input type="hidden" name="id" value="' + jId +'" />' +
        '<input type="hidden" name="keyword" value="' + key + '" />'+
        '<input type="hidden" name="location" value="' + loc +'" />'+
        '<input type="hidden" name="company" value="' + company +'" />'+
        '<input type="hidden" name="jtitle" value="' +jtitle +'" />'+

        ' </p>' + '</div>' +

    '<div class="modal-footer">' + '<button class="btn" data-dismiss="modal" aria-hidden="true">Cancel</button>' + '<input type="submit" class="btn btn-primary" value="Send" /></form>' + ' </div>' + '</div>';
    return btn;
}

function genSaveBtn(title, url) {
    var btn = '<a href="#myModal" role="button" class="btn" data-toggle="modal">Save Job</a>' + '<div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' + '<div class="modal-header">' + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>' + '<h3 id="myModalLabel">Share with Friend</h3>' + '</div>' + '<div class="modal-body">' + '<p>' +
/* '<form>'+
    '<label for="fname">Friend Name:</label><input type="text" name="fname" />'+
   ' <label for="femail">Email:</label><input type="text" name="femail" />'+
   ' <textarea name="msg" col="4" rows="30">'+message+'</textarea>'+
'</form>'+
*/

    'Bookmarked Job:' + title + " Url:" + url + '</p>' + '</div>' +

    '<div class="modal-footer">' + '<button class="btn" data-dismiss="modal" aria-hidden="true">Cancel</button>' + '<button class="btn btn-primary">Send</button>' + ' </div>' + '</div>';
    //bookmark(title,url);
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
        elem.click(); // this.title=document.title;
    }
}


function getJobSummary(jID, jTitle, company) {
    var url = "http://54.235.212.123:8080/ajaxjobsummary.php?company=" + company + "&id=" + jID + "&title=" + jTitle;
    var info;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "jsonp",
        jsonpCallback: "_testcb",
        success: function (data) {
            console.log("ObjGetSummary:" + JSON.stringify(data));
            info = data;
        }
    });
    return JSON.stringify(info);
}

function generateJPost(jID, jTitle, jLocation, jDate, jobApplyLink, jobDetailLink, company) {

    //NOTE: jID will be used to construct the job apply button...
    // jLocation will be used for locations of the job..
    if (!jTitle) {
        return "";
    }
    if (!jLocation) {
        jLocation = " Please see job post for more details."
    }
    if (!jDate) {
        jDate = "";
    }
var jobinfo;
var jobService="http://54.235.212.123:8080/ajaxjobsummary.php";
var jobparam="company=" + company + "&id=" + jID + "&title=" + jTitle;
    var placeholder=company+"_"+jID;
    try{
/*
    var jobrequest = $.ajax({
 //   var request = $.jsonp({
        url: jobService,
        type: "GET",
        dataType: "jsonp",
        jsonpCallback: "_testcb",
        cache: true,
        data: jobparam,
        success: function (data, textStatus) {
     //   jobinfo=data;
        //if(){

            $("#"+company+"_"+jID).append(data.replace(jTitle));
       // }else{
        //    $("#"+company+"_"+jID).append("Empty");
        //}
        console.log(JSON.stringify(data));
        },error:function(){
            console.log("Error happened in the job service ajax code");
        }

});
*/
    }catch(err){
        console.log("caught and error: "+err);
    }

    var url = "http://54.235.212.123:8080/ajaxjobdetail.php?company=" + company + "&id=" + jID + "&title=" + jTitle;
    var div = "<!-- Post --><div class=\"content\">" + "<div class=\"alpha fourteen columns\"><div class=\"post-title\">" +
    "<h2><a target=\"_blank\" href='" + url + "'>" + jTitle.removeAll("*") + "</a></h2></div></div><div class=\"alpha omega three columns\"><div class=\"post-date\">" +
    jDate + "</div></div><div class=\"alpha eight columns post-content\"><div class=''><div class=\"post-desc\"><blockquote><p>" + " Location: " + jLocation + "</p>" +
    "<cite title='Source Title'>"+
        "<div id='"+placeholder+"'></div>"+

    //getJobSummary(jID,jTitle,company)+

    "</cite>"+
    "</blockquote>" +
    //"<a class=\"post-entry\" href='"+jobApplyLink+"?job="+jID+"'>"+"Click here to apply</a>"+
    //"<a class=\"post-entry\" href='"+jobDetailLink+"?job="+jID+"'>"+"Click here for more details</a>"+http://184.72.242.129/index.php/ajaxjobdetail?company=citi&id=802266
    "<a class=\"post-entry\" target=\"_blank\" rel=\"tooltip\"  data-original-title=\"Another one here too\" href='" + url + "'>" +
    "Click here for more details</a>" + "</div></div><div class=\"post-meta\"><table class='btnPanel'><tr><td><span><a class=\"btn-beoro-7 btn-small\" href=\"#\">"
    + genEmailBtn(company, jID, $("#role").val(), $("#location").val(),jTitle)  + "</a></span></td><td><span style='line-height:5'>" + '<script type="IN/Share" data-url="' + url + '"></script>' +
        "</span></td><td><span style='vertical-align:bottom;'><a href=\"#\">" + '<span class="label label-info"><a class="btn btn-beoro-7 btn-small" style="margin-bottom:10px" href="search?keyword=Company:%20'+company+'&local='+$("#location").val()+'">Find more ' + company + ' jobs</a></span>' + "</a></span></td></tr></table>" + "</div></div></div><div class=\"clearfix\"></div><hr>";
    return div;

}
