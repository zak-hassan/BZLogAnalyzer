package com.bzcareer.paas.rest;

import java.net.UnknownHostException;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

import com.bzcareer.paas.persistence.MongoDBService;
import com.bzcareer.paas.persistence.SearchResults;
 
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
 		SearchResults list=null;
//		if(company.equalsIgnoreCase("all")){
		try {
			list= mservice.query(role, location, page);
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
//		} else {
//			list= mservice.queryByCompany(company,role,location, page);
//		}
       return list;
    }
	
	@GET
	@Path("/autocomplete")
	@Produces("application/json")
	public List<String> getKeywords(@QueryParam("start_with") String starts_with, @QueryParam("country") String country){
		
		try {
			return mservice.queryAutocomplete(starts_with, country);
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
		
		
	}
	
}
