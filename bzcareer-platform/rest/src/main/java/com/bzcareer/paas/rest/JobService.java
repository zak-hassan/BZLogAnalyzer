package com.bzcareer.paas.rest;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
 
@Path("/jobservice")
 public class JobService {
 
	
//TODO: Add some logic here to pull data from the persistence service via osgi
	@GET
    @Path("/jobs")
	@Produces("application/json")
	public List<String> getCustomer( ) {
        List<String> list= new ArrayList<String>();
       list.add("Hello");
       
       return list;
    }
	
	@GET
	@Path("/autocomplete")
	@Produces("application/json")
	public List<String> getKeywords(@QueryParam("start_with") String starts_with){
		List<String> list= new ArrayList<String>();
		if(starts_with.equals("J"))
		list.add("Java");
		list.add("Janitor");
		list.add("Java Developer");
		
		return list;
	}
	
}
