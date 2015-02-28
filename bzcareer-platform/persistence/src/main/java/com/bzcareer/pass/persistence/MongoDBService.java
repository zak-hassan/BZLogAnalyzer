package com.bzcareer.pass.persistence;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import org.bson.Document;

import com.mongodb.BasicDBObject;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;

public class MongoDBService {

	public SearchResults query(String keyword, String local, int num) {
		// TODO: Get search results from MongoDB remotely and query the jobs
		 SearchResults results=new SearchResults();
		if (isValid(keyword) && isRealLocation(local)) {
			MongoCollection<Document> 	collection = DriverWrapper.connect("CAUrlDB", "newCanadaMap");

			
			Date start = new Date(System.currentTimeMillis());
			MongoCollection<Document> collection = DriverWrapper.connect(
					"ResultsIndexCanada", "FinishedJobsIndexed");
			int count = 0;
			Map<String, Integer> side = new HashMap<String, Integer>();

			collection.count();
			FindIterable<Document> found = collection.find();

			for (Document document : found) {
				System.out.println("Contains Company Name: " + document.keySet());
				DriverWrapper.addUnique(side, document.get("CompanyName")
						.toString());
				
				Job job = new Job();
				if (document.keySet().contains("CompanyName")) {
					job.setCompanyName(document.get("CompanyName").toString());
				}
				if (document.keySet().contains("JobDate")) {
					job.setJobDate(document.get("JobDate").toString());
				}
				if (document.keySet().contains("JobDetails")) {
					String jdescribe = document.get("JobDetails").toString();
					if (jdescribe.length() < 120) {
						job.setJobDetails(document.get("JobDetails").toString());
					} else {
						job.setJobDetails(document.get("JobDetails").toString()
								.substring(0, 120)
								+ "...");
					}
				}
				if (document.keySet().contains("JobDetailURL")) {
					job.setJobDetailURL(document.get("JobDetailURL").toString());
				}
				if (document.keySet().contains("JobID1")) {
					job.setJobID1(document.get("JobID1").toString());
				}
				if (document.keySet().contains("JobLocation")) {
					job.setJobLocation(document.get("JobLocation").toString());
				}
				if (document.keySet().contains("JobTitle")) {
					job.setJobTitle(document.get("JobTitle").toString());
				}
				if (document.keySet().contains("JobType")) {
					job.setJobType(document.get("JobType").toString());
				}

				System.out.println(job);
				count++;
				 results.addJob(job);

			}
			System.out.println(" Done !!! ");
			Date end = new Date();
			System.out.println(" Started : " + (start));
			System.out.println(" Ended : " + (end));
			System.out.println(" Total Jobs: " + count);
			System.out.println(" Total Sidebar: " + side);
			System.out.println(" Total Companies: " + side.size());
			Sidebar sidebar = new Sidebar();
			sidebar.setCompanies(side);
			results.setSideBar();
			
			
			
		}
	}

	private boolean isRealLocation(String local) {
		// TODO Check database to confirm that the location exists in Canada.
		// They may use a city or a province.
		// Check for null
		return true;
	}

	private boolean isValid(String keyword) {
		// TODO Make sure the the keyword is not undefined or null ...
		// TODO Check for null ...
		// TODO Also check if this is a synonyms of the word ...
		return true;
	}

	public List<SearchResults> queryByCompany(String company, String role,
			String location, int page) {
		//TODO: When queries come in this is a result of 'company:*' in the query string keyword param.
		
		return new ArrayList<SearchResults>();
	}

	public List<SearchResults> queryByJobType(String jobType, String role,
			String location, int page) {
		//TODO: When queries come in this is a result of 'company:*' in the query string keyword param.
		return new ArrayList<SearchResults>();
	}

 

	public List<String> queryAutocomplete(String starts_with, String country) {

		MongoCollection<Document> cities = null;
		// TODO: Need to pull keywords from CAUrlDB.newCanadaMap.find({city:''})
		if (country.equalsIgnoreCase("Canada")) {
			cities = DriverWrapper.connect("CAUrlDB", "newCanadaMap");
		} else if (country.equalsIgnoreCase("US")) {
			cities = DriverWrapper.connect("USAUrlDB", "newUSAMap");
		}
		BasicDBObject q = new BasicDBObject();
		q.put("City", Pattern.compile(starts_with));
		cities.find(q);
		return new ArrayList<String>();
	}

}
