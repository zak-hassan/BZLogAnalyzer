// Developed By: Zakeria Hassan
// License: GPL (GNU- GENERAL PUBLIC LICENSE)

    window.onload=function(){

	org_wedevelop = new Object;
	if (typeof(org_wedevelop)!= "object")
		throw new Error("org_wedevelop not an object!");

		org_wedevelop.sName="make_A_Form";
		org_wedevelop.sVersion="1.0";
//here we will be declaring properties for this object
org_wedevelop.laugh="HA ha ha haa.!";
org_wedevelop.bark="ruff ruff ruff";
org_wedevelop.makeMeSmile= function(){
console.log("Please makes me smile");

}

	fn_createOBJ();
	}


	//Here i am declaring a new object and keeping it global
	
function fn_createOBJ(){



		console.log("NAME: "+org_wedevelop.sName);

	var obj= new Object;
console.log("This obj:"+obj)
org_wedevelop.makeMeSmile;
}

//Here are I am doing some exception handling;


function exception(){
			try{


					//here you put the code that make errors
			}
					catch(e){  //optional if finally is used

/*		--one way --		throw new Error("An error occured ");
*		--another way --		throw "An error occured ";
*		--you can also throw numbers --		throw 12345;
*/


			//this is the code used to deal with error.
		//handle_error();
					}

	finally{//optional if catch is used
//here we use some clean up code.
//clean_up();
	}
}




//Example of using errorhandling
function getName(){
var sName = prompt("Enter a name","");
	if(!sName || sName.length==0)
		throw new Error("Name was not permitted form.");
		
	alert("YOu entered:"+sName);

}
function testException(){
		try {
			getName();
				}
					catch(e){
							alert(e.name+": "+e.message);
						}
}
//window.onload=testException();



/*		Here I will demonstrate using the modern event model
//		Events can be chained together to call a number of events in one object.
//		You can turn them on and off as you wish.
//		Events travels from document ----> ul -->li
//		when it is traveling down it is in capturing fase
//		Then when it reachs the location this is called AT TARGET
//		If the event was not handled it bubbles back up.
//		For IE it there are problems when seting up on capture stage.
//		<body onload="Init()">	-- this is the old way
						
		window.addEventListener("load",onWindowLoad,false);	//--the new way
		window.attachEvent("onload",onWindowLoad);

	--onWindowLoad : is a function that is called whenthe event happens.


	DOM: element.addEventListener(evt,fn,capture),
			 element.removeEventListener(evt,fn,capture)
	IEx:	 element.attachEvent(evt,fn),
			 element.detachEvent(evt,fn)

*/

//here is a small utility function to set up Modern event Model:


/*		oNode: element we want to register the event on.
 *		sEvt:	the string that represents the event
 *		fnHandler:	the function that registers then handler
 *OPTIONAL: bCapture as 4th Arg: which is a boolean that specifies if this
 *						fire off when it is in the capture stage.
 */				
	function addEventHandler(oNode,sEvt,fnHandler,bCapture){
		if(typeof(window.event)!="undefined")
		oNode.attachEvent("on"+sEvt,fnHandler);
		else
		oNode.addEventListener(sEvt,fnHandler,true);
	}

	function removeEventHandler(oNode,sEvt,fnHandler,bCapture){
		if(typeof(window.event)!="undefined")
		oNode.detachEvent("on"+sEvt,fnHandler);
		else
		oNode.removeEventListener(sEvt,fnHandler,true);
	}


		function setUpClickHandler(){
	addEventHandler(document.getElementById("pickLotto"),"click",onLinkClicked,false);
	}

//The following two functions work together

function getEventTarget(e){
	if(window.event!=null) return window.event.srcElement;
	else return e.target;

}

function onEnableClick(e){
	var target=getEventTarget(e);
	if(target.checked)
	addEventHandler(document.getElementById('clickLink'),"click",onLinkClicked,false);
	else
	removeEventHandler(document.getElementById('clickLink'),"click",onLinkClicked,false);
	
}





function onLinkClicked(e)
{
alert("welcome ");
}


//Here is where we call then evt handler to call setUpClickhn when it loads
	addEventHandler(window,"load",setUpClickHandler,false);

function eventHandler(e){
	var evt = e || window.event;
			//			.....
}




/*****************************************************************	
*	here we have a global object is also a property of window.
* 
*		ex. 
*		window.obj
*****************************************************************/
var obj=new Object;
obj.name="drake";


		function initAll(){
//here we use references to reference a local variable to point to the same object

				var obj= new Object; //works the same unless the other variable 
														// is assigned to a new Object like this
														//... 			newObj= new Object; --this points to new

			var newObj= obj;
			obj.name="scobby doo,";
			console.log("NEW OBJ:" + newObj.name);

			//sending some data to the checkArg fn
			CheckArg(obj,newObj);
		}

	function CheckArg(dog,cat){
			//to check if the right number of arguments where sent to the function
			//.. Do this:
			if(arguments.length==2){
			console.log("Arguements eq 2");
			}
			else{
			console.log("Arguments eq" + arguments.length)
			}

if(cat==undefined || dog==undefined){
(cat==undefined)?console.log("No cat"):(dog==undefined)?	console.log("No cat"):console.log("you put cat and dog");


	}
var num="10"
CheckType(num);
}


function CheckType(num){
alert(num);

//typeof: is a function to check the datatype of a variable
	if(typeof num == "string"){
num=parseInt(num);
var sum= num * 10;
console.log("the sum is:" + sum+"The typeof is: "+ typeof(sum));
	}
/*				typeof vs. .constructor
				------------------------
-typeof returns strings while .constructor returns objects


*/

	//To check for a variables datatype is by using the .constructor method

	console.log("The Number Constructor: "+num.constructor);
	/*		OUTPUT: 
	
	The Number Constructor: function Number() { [native code] }
	
		
	*/
	if(num.constructor==String){
		console.log("num is a string");
	}else if(num.constructor==Array){
			console.log("num is a array");
	}else if(num.constructor==Function){
		console.log("num is a Function");
	}else if(num.constructor==Number){
		console.log("num is a Number");
	}else if(num.constructor==Boolean){
		console.log("num is a Boolean");
	}else if(num.constructor==User){
	console.log("num is a user");
	}
/*
		Output:
		num is a Number
*/

	
}



//function Closures(){
/**** THis is an example of closure			

function init() {
  var name = "Mozilla"; ==> this is defined outside of display().
  function displayName() {
    alert(name);			 ==> as you can see displayName can use variables outside
    									 ==> of its scope.
  }
  return displayName();
}

var myFunk =init();		==> now you can see that this returns a function
myFunk() 							== now you can use this to access displayName();
--
--nested functions have access to variables declared in their outer scope.
--Usage:
				If you know your going to try different arguments with the function then closure is you best bet. this is called FUNCTION FACTORY...

*/

function makeAdder(x) {
console.log("x="+x);
  return function(y) {
		console.log("y="+y);
    return x + y;
  };
}






//}


//window.onload=

var add5 = makeAdder(5);
//var add10 = makeAdder(10);

console.log(add5(2));  // 7

console.log(add5(5));  // 7
console.log(add5(7));  // 7

//console.log(add10(2)); // 12





