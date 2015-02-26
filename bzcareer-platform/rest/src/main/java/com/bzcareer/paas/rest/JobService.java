package com.bzcareer.paas.rest;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
 
@Path("/jobservice/")
 public class JobService {
 
	
//TODO: Add some logic here to pull data from the persistence service via osgi
	@GET
    @Path("/jobsearch/")
    public List<String> getCustomer( ) {
        List<String> list= new ArrayList<String>();
       list.add("Hello");
       
       return list;
    }
	
}
