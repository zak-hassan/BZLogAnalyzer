package com.bzcareer.paas.metrics.jmx;

public interface MongoDBMBean {
 
	public long getTotalJobs(String db, String collection);
	public long getTotalCompanies();
	 
}
