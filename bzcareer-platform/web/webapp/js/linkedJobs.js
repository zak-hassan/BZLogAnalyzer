
//LINKEDIN JSONP.  https://www.linkedin.com/ta/federator?types=company&query=Microsoft

function getCompanyDetails(companyname){
	var company={};
		$.ajax({ url:'https://www.linkedin.com/ta/federator?types=company&query='+companyname,
			type: "GET",
		    dataType: "jsonp"}).success(function(data){
		    	company.img=data.company.resultList[0].imageUrl;
		    	company.id=data.company.resultList[0].id;
		    });
	return company
	}

function companyProfile(companyid){
var script='<script src="//platform.linkedin.com/in.js" type="text/javascript"></script>'+
'<script type="IN/CompanyProfile" data-id="'+companyid+'" data-format="inline"></script>'
}



var obj={"id":"1826","headLine":"<strong>CIBC</strong>",
"imageUrl":"https://media.licdn.com/mpr/mpr/shrink_40_40/p/7/000/1d6/3ed/16ef30c.png",
"displayName":"CIBC","subLine":"Banking; 10,001+ employees",
"url":"http://www.linkedin.com/company/1826"};





var imgtag="<img src='"+obj.imageUrl+"' />"

function fetchCompany(companyname){

    var request = $.ajax({
      url:https://www.linkedin.com/ta/federator?types=company&query=Microsoft,
      type: "GET",
      dataType: "jsonp",
      
        cache: false,
      success:function(data){
   
    
}, error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        });
//We return false because we don't want a redirect..

return;
}; //This is for the document.ready...
