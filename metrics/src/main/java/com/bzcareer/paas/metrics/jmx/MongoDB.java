package com.bzcareer.paas.metrics.jmx;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.bson.Document;

import com.bzcareer.paas.persistence.DriverWrapper;
import com.bzcareer.paas.persistence.Job;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;

public class MongoDB implements MongoDBMBean {

	public int TotalCompanies;
	public int TotalJobs;
	public Map<String,Integer> companyStats;
	
	public int getTotalCompanies(){
		return this.TotalCompanies;
	}
	public int getTotalJobs(){
		return this.TotalJobs;
	}
	public Map<String,Integer> getCompanyStats(){
		return companyStats;
	}
	
	public MongoDB() {
		Date start = new Date(System.currentTimeMillis());
		MongoCollection<Document> collection = DriverWrapper.connect("ResultsIndexCanada",
				"FinishedJobsIndexed");
		int count = 0;
		Map<String, Integer> side = new HashMap<String, Integer>();

		collection.count();
		FindIterable<Document> found = collection.find();
		
		for (Document document : found) {
			DriverWrapper.addUnique(side, document.get("CompanyName").toString());
			count++;
		}
 
		System.out.println(" Total Sidebar: " + side);
		System.out.println(" Total Companies: " + side.size());
		companyStats=side;
		TotalCompanies=side.size();
		TotalJobs=count;
	}
	
	public long getTotalJobs(String db, String collection) {
//		MongoCollection<Document> col = DriverWrapper.connect("ResultsIndexCanada",
	//			"FinishedJobsIndexed");
		MongoCollection<Document> col = DriverWrapper.connect(db,
				collection);
		int count = 0;
		Map<String, Integer> side = new HashMap<String, Integer>();
		return col.count();
	}

 
}
