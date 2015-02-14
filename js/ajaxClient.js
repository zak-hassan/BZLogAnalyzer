// Developer: Zak Hassan
// Email: zak.hassan1010@gmail.com
var $zmLib= {
init: function(frm,divName){
		// Here I am creating a namespace ..
		//this is our global object that we store information in and a lot of the logic of my code revolves around this object
			if(typeof(this)!="object"){
				throw new Error("Object doesn't exist Please contact developer!!zakhassa@ca.ibm.com");
			}
			this.pName="RestClientApp";
			this.oDeveloper="Zakeria Hassan";
			this.modifiedBy="";  //Please include your name if you are maintaining this javascript.
			this.pVersion="0.1";
			this.di=divName;
			this.asyncUrl=document.getElementById("url").value;
			if(this.asyncURL==""){
				throw new ERROR("URL is empty");
			}
			console.log("URL: " + frm.url);
				if(navigator.product=="Gecko"){
					this.browser="Firefox";
					console.log("Browser is firefox");
				} else {
					this.browser="Other";
					console.log("Browser is firefox");
					}
				createHTTPRequest();
			return false;
		}, createHTTPRequest: function(url){
			try{
				var xmlobj;
					if(window.XMLHttpRequest){  // This will let use know if this is a NON-IE browser
							console.log("Creating XMLHTTPOBJECT..");
							xmlobj = new XMLHttpRequest();
					} else if(window.ActiveXObject) {  // This will let use know if it is an IE 8 or older browser
							xmlobj = new ActiveXObject("Microsoft.XMLHTTP");
						}
						else{
						throw new Error("Sorry but unfortunately your browser is not support. Maybe its time to update. Sorry.");
						}
					if(xmlobj!="undefined"){
					//..URL ==http://freegeoip.net/xml/142.204.104.11
						if(url != "undefined"){
							makeRequest(xmlobj,"GET",url);
						} else {
							makeRequest(xmlobj,"GET",this.asyncUrl);
						}
						return true;
					}else{
						console.log("xmlobj is undefined");
						return false
					}
				}catch(e){
				}finally{
			}
	},  makeRequest : function(xmlMessage,type,url){
			//..Here we are making an asynchronous ajax call the this website and processing the data.
		try{
			console.log("Making the Request!");
			//....TODO: Uncomment this below after.
			xmlMessage.open(type,url,true);
			//.. Ajax is has a one origine rule and for this reason I am using withCredentials method of the XMLHTTPRequest.
			//   xmlMessage.withCredentials=true;
			//.. If this is a webserver that requires a password..:
			xmlMessage.send();
			//  loginRequest(xmlMessage);

			this.ajaxText = xmlMessage.responseText;
			//..Storing in our global object will let us pass around the data that is returned
			this.ajax = xmlMessage;
			console.log(xmlMessage.responseText);
			//.. We are setting up a call back function which will execute once the XMLHTTP object is ready..
					xmlMessage.onreadystatechange=requestHandler;
				}catch(e){
					console.log("Error");
				} finally{

				}
		 	return false;
		}, requestHandler : function (divName){
				//.. Here we are checking if the browser is ready and if the response is OK. 200 means okay.
				if (this.ajax.readyState>=2 && this.ajax.status==200){
					console.log("Made request to get data");
					document.getElementById(divName).innerHTML="<code>"+this.ajax.responseText+"</code>";
					console.log("Wrote to div"+this.ajax.responseText);
				}else{
			throw new Error("Sorry exception on url : "+this.asyncUrl+"\n Status:"+this.ajax.status +"\n State: "+this.ajax.readyState);
				}
		}, ending: function (){
			try{
				makeRequest(this.ajax,"POST","http://localhost/RestClient.php", false);
				send(xml=this.ajaxText);
				alert("You are sending a post: " + this.ajaxText.toString());
			}catch(e){
				console.log("Error in ending function");
			} finally{
				console.log("Done ending function");
			}
		}
	};



	function startup(frm){
		zmLib.init(frm);
		return false;
	}
