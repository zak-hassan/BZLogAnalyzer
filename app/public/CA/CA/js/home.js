function fetchSearch(){
window.location.replace("http://www.bzcareer.com/CA/search?keyword="+encodeURIComponent(document.getElementById("role").value)+"&local="+encodeURIComponent(document.getElementById("location").value));
}

$(document).ready(function(){
    $("#searchbtn").click(function () {
          var role, local;
          role=$("#role").val(); //.replace(" ","%20");
          local=$("#location").val();
        if(role.trim().length==0 && local.trim().length==0){
            $("#err").modal('show');
        }else{
/*
            if(location.pathname.substr(location.pathname.length-1,1)=="/"){
                window.location.replace(location.href + "search?keyword=" + encodeURIComponent(role) + "&local=" + encodeURIComponent(local));
            }else{
                window.location.replace(location.href + "/search?keyword=" + encodeURIComponent(role) + "&local=" + encodeURIComponent(local));
            }
*/
fetchSearch();
        }
    });

    $("#location").on('keypress', function (e) {
        if ( e.which == 13 ){
                $("#searchbtn").click();
            }
    });

    $("#role").on('keypress', function (e) {
        if ( e.which == 13 ){
                $("#searchbtn").click();
        }
    });

$("footer").css({"left":"0", "position":"fixed", "text-align":"center","bottom":"0","width":"100%" });

});

