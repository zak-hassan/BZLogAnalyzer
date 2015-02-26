package com.bzcareer.paas.rest;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

import com.bzcareer.pass.persistence.MongoDBService;
import com.bzcareer.pass.persistence.SearchResults;
 
@Path("/api")
 public class JobService {
 
	//TODO: Use references in osgi rather then this 
	MongoDBService mservice= new MongoDBService();
	
//TODO: Add some logic here to pull data from the persistence service via osgi
	@GET
    @Path("/jobs")
	@Produces("application/json")
	public List<SearchResults> getCustomer( @QueryParam("keyword") String keyword, @QueryParam("location") String local, 
			@QueryParam("num") int num) {
		//TODO: Add logic for connecting to mongodb.
		List<SearchResults> list=mservice.query(keyword, local, num);
		
		 
       
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
