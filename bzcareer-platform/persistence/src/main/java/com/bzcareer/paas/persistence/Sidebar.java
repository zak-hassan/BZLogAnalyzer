package com.bzcareer.paas.persistence;

import java.util.Map;

public class Sidebar {
	private Map<String, Integer> Companies;
	private Map<String, Integer> JobType;
	public Map<String, Integer> getCompanies() {
		return Companies;
	}
	public void setCompanies(Map<String, Integer> companies) {
		Companies = companies;
	}
	public Map<String, Integer> getJobType() {
		return JobType;
	}
	public void setJobType(Map<String, Integer> jobType) {
		JobType = jobType;
	}
	@Override
	public String toString() {
		return "Sidebar [Companies=" + Companies + ", JobType=" + JobType + "]";
	}
	
}
