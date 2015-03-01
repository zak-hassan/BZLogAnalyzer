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
	public SearchResults getJobs( @QueryParam("role") String role, @QueryParam("location") String location, 
			@QueryParam("page") int page, @QueryParam("company") String company) {
		//TODO: Add logic for connecting to mongodb.
		SearchResults list;
		if(company.equalsIgnoreCase("all")){
			 list=mservice.query(role, location, page);
		} else {
			list= mservice.queryByCompany(company,role,location, page);
		}
       return list;
    }
	
	@GET
	@Path("/autocomplete")
	@Produces("application/json")
	public List<String> getKeywords(@QueryParam("start_with") String starts_with, @QueryParam("country") String country){
		
		return mservice.queryAutocomplete(starts_with, country);
		
		
	}
	
}
