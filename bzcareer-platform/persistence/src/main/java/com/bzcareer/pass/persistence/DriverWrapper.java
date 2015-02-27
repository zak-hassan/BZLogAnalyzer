package com.bzcareer.pass.persistence;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.bson.Document;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class DriverWrapper {

	public static void addUnique(Map<String, Integer> totalCompanies, String val) {
		if (!totalCompanies.containsKey(val)) {
			totalCompanies.put(val, 1);
		} else {
			totalCompanies.put(val, totalCompanies.get(val) + 1);
		}
	}

	public static void main(String[] args) {
		Date start = new Date(System.currentTimeMillis());
		MongoCollection<Document> collection = connect("ResultsIndexCanada",
				"FinishedJobsIndexed");
		int count = 0;
		Map<String, Integer> side = new HashMap<String, Integer>();

		for (Document document : collection.find()) {
			System.out.println("Contains Company Name: " + document.keySet());
			addUnique(side, document.get("CompanyName").toString());
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

		}
		System.out.println(" Done !!! ");
		Date end = new Date();
		System.out.println(" Started : " + (start));
		System.out.println(" Ended : " + (end));
		System.out.println(" Total Jobs: " + count);
		System.out.println(" Total Sidebar: " + side);
		System.out.println(" Total Companies: " + side.size());

	}

	public static MongoCollection<Document> connect(String db, String collection) {
		MongoClient mongoClient = new MongoClient("bzcareer.com", 27017);
		MongoDatabase database = mongoClient.getDatabase(db);
		MongoCollection<Document> col = database.getCollection(collection);
		return col;
	}
}
