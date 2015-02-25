					var fillCity=function(country,state){
					$.ajax({url:"/getCities",
			 			type: "GET",
						data:"country="+country.toUpperCase()+"&state="+state.toUpperCase(),
						success:function(data){ 
					var ops="";
					ops="<br /><label for='JobLocation'>City: <span>*</span></label>";
				 	ops+="<select name='JobLocation' id='JobLocation'><option value=''>Choose...</option>";
	for(var d in data){
	ops+="<option value='"+data[d].City+", "+$("#jState").find(':selected').val()+", "+$("#jCountry").find(':selected').text()+"'>"+data[d].City+", "+data[d].State+"</option>";
					}
					ops+="</select>";
					document.getElementById("City").innerHTML=ops;	
						 }								
					});
					};
					var fillState=function(country){
						if(country=="US" || country=="CA"){
						 $.ajax({url:"/getStates",
							type: "GET",
							data:"country="+country,
							success:function(data){ 
								var ops="";
							if(country=="US"){
								ops="<br /><label for='location'>State: <span>*</span></label>";
							}else if(country=="CA"){
								ops="<br /><label for='location'>Province: <span>*</span></label>";
							}

ops+="<select name='jState' id='jState' onchange='fillCity(\""+country+"\",this.value);'><option value=''>Choose...</option>";
	for(var d in data){
			ops+="<option value='"+d+"'>"+data[d]+"</option>";
	}
	ops+="</select>";
	document.getElementById("State").innerHTML=ops;	
	
								 }
									
						});
				 
						}
				};
