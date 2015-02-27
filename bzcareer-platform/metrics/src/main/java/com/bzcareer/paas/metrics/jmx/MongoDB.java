package com.bzcareer.paas.metrics.jmx;

import java.util.HashMap;
import java.util.Map;

import org.bson.Document;

import com.bzcareer.pass.persistence.DriverWrapper;
import com.mongodb.client.MongoCollection;

public class MongoDB implements MongoDBMBean {

	public long getTotalJobs(String db, String collection) {
//		MongoCollection<Document> col = DriverWrapper.connect("ResultsIndexCanada",
	//			"FinishedJobsIndexed");
		MongoCollection<Document> col = DriverWrapper.connect(db,
				collection);
		int count = 0;
		Map<String, Integer> side = new HashMap<String, Integer>();
		return col.count();
	}

	public long getTotalCompanies() {
		
		return 0L;
	}

}
