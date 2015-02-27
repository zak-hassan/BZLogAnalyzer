package com.bzcareer.paas.metrics.jmx;

import java.util.Map;

public interface MongoDBMBean {
	public int getTotalCompanies();
	public int getTotalJobs();
	public Map<String,Integer> getCompanyStats();
	public long getTotalJobs(String db, String collection);
	
}
