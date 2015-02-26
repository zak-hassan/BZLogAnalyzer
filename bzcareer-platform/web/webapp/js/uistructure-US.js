function fetchResults(col, companyFilter) {
var parm="isLocal="+encodeURIComponent($("#location").val().trim())+"&country="+encodeURIComponent("CA");
var r;
    $("body").css({"cursor":"wait"});

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
    var baseurl = "http://54.235.212.123:8080/ajaxSearchjsonp.php";
    var c = (companyFilter) ? companyFilter.trim() : "All";
    var r = ($("#role").val().trim().toLowerCase() == "") ? "" : $("#role").val().trim();
    //Added a line to handle empty input
    var l = ($("#location").val().trim().toLowerCase() == "") ? "United States" : $("#location").val().trim();
    r = r.initCap();
    //c = c.initCap();
    //decodeURIComponent
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
    console.log(qparam);
   var request = $.jsonp({
        url: baseurl,
        type: "GET",
        dataType: "jsonp",
       callbackParameter: "callback",
        cache: true,
        data: qparam,
        success:function (data) {
$.sticky("We found " + data.TotalJobs + " jobs", {'speed' : 'fast',  'duplicates' : true, 'autoclose' : 5000 ,type: "st-success"});
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
            if (!less && PaginQueue.getTotalPages() < 10) {
                less = true;
                PaginQueue.setupNav();
            }
            $("#Searchsum").show();
            $("#Searchsum").empty();
            $("#Searchsum").append("<span class='label label-inverse'> Page " + PaginQueue.getPageNum() + " of " + PaginQueue.getTotalPages() + " pages</span>");
            $("a").tooltip('hide');
            $("body").css({"cursor":""});
            $(".blog-sidebar").show();
        },
        error:function(){
            $("body").css({"cursor":""});
            $(".blog-sidebar").show();
            $("#err").modal('show');
                $("#json").append(d);
                $("#json").show();
                $("#pbar").hide();
        }
    });
    return;
};

function genEmailBtn(company, jId, key, loc,jtitle) {
    var btn = '<form action="referme" method="get"><a href="#myModal" role="button" style="margin-bottom:10px;margin-right:30px;" class="btn btn-beoro-7" data-toggle="modal"><i class="icsw16-mail"></i> Email Friend</a>' +
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
function ClosePopup(){
    $("#err").modal('hide');
}
function genSaveBtn(title, url) {
    var btn = '<a href="#myModal" role="button" class="btn" data-toggle="modal">Save Job</a>' + '<div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' + '<div class="modal-header">' + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>' + '<h3 id="myModalLabel">Share with Friend</h3>' + '</div>' + '<div class="modal-body">' + '<p>' +
    'Bookmarked Job:' + title + " Url:" + url + '</p>' + '</div>' +
    '<div class="modal-footer">' + '<button class="btn" data-dismiss="modal" aria-hidden="true">Cancel</button>' + '<button class="btn btn-primary">Send</button>' + ' </div>' + '</div>';
    return btn;
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

function generateJPost(jID, jTitle, jLocation, jDate, jobApplyLink, jobDetailLink, company, flagHideMoreCompany) {

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
    "<h2><a target=\"_blank\" href='" + url + "'>" + jTitle.removeAll("*") +
    "</a></h2></div></div><div class=\"alpha omega three columns\"><div class=\"post-date\">" + "At :" + company +"<br />"+
    jDate + "</div></div><div class=\"alpha eight columns post-content\"><div class=''><div class=\"post-desc\"><blockquote><p>" +
    " Location: " + jLocation + "</p>" + "<cite title='Source Title'>"+ "<div id='"+placeholder+"'></div>"+
    "</cite>"+
    "</blockquote>" +
    "<a class=\"post-entry\" target=\"_blank\"> "+
    "Click here for more details</a>" +
    "</div></div><div class=\"post-meta\"><ul class='inline'><li>"+
//    generateMoreButton(company,$("#role").val(),true)   +
    "<a class=\"btn-beoro-7 btn-small\" href=\"#\">"+
     genEmailBtn(company, jID, $("#role").val(), $("#location").val(),jTitle)  +
        "</a></li><li><span>" + '<script type="IN/Share" data-url="' + url + '"></script>' +
        "</span></li>"+
        //generateMoreButton(company,$("#location").val(),true)+

        "</ul>" +
        "</div></div></div><div class=\"clearfix\"></div><hr>";
    return div;

}
 // I need to uncomment this function once Wallid is done.
var generateMoreButton=function(company,loc,flag){
    var btn="";
        if(flag){
              btn="<td><span style='vertical-align:bottom;'><a href=\"#\">" +
                '<span class="label label-info"><a class="btn btn-beoro-7 disabled"  '+
                'style="margin-bottom:10px" disabled="disabled" href="search?keyword=Company:%20'+
                company+'&local='+loc+'">Find more ' + company + ' jobs</a></span></a></span></td>';
        }
      return btn;
}


var filterByCompany=function(company){
    fetchResults(1,company);
}
