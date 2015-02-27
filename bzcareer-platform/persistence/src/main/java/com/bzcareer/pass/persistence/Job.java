package com.bzcareer.pass.persistence;

public class Job {
	String JobTitle;
	String JobDetailURL;
	String JobLocation;
	String JobDate;
	String JobType;
	String CompanyName;
	String JobID1;
	String JobID2;
	String JobDetails;
	
	@Override
	public String toString() {
		return "Job [JobTitle=" + JobTitle + ", JobDetailURL=" + JobDetailURL
				+ ", JobLocation=" + JobLocation + ", JobDate=" + JobDate
				+ ", JobType=" + JobType + ", CompanyName=" + CompanyName
				+ ", JobID1=" + JobID1 + ", JobID2=" + JobID2 + ", JobDetails="
				+ JobDetails + "]";
	}
	public String getJobTitle() {
		return JobTitle;
	}
	public void setJobTitle(String jobTitle) {
		JobTitle = jobTitle;
	}
	public String getJobDetailURL() {
		return JobDetailURL;
	}
	public void setJobDetailURL(String jobDetailURL) {
		JobDetailURL = jobDetailURL;
	}
	public String getJobLocation() {
		return JobLocation;
	}
	public void setJobLocation(String jobLocation) {
		JobLocation = jobLocation;
	}
	public String getJobDate() {
		return JobDate;
	}
	public void setJobDate(String jobDate) {
		JobDate = jobDate;
	}
	public String getJobType() {
		return JobType;
	}
	public void setJobType(String jobType) {
		JobType = jobType;
	}
	public String getCompanyName() {
		return CompanyName;
	}
	public void setCompanyName(String companyName) {
		CompanyName = companyName;
	}
	public String getJobID1() {
		return JobID1;
	}
	public void setJobID1(String jobID1) {
		JobID1 = jobID1;
	}
	public String getJobID2() {
		return JobID2;
	}
	public void setJobID2(String jobID2) {
		JobID2 = jobID2;
	}
	public String getJobDetails() {
		return JobDetails;
	}
	public void setJobDetails(String jobDetails) {
		JobDetails = jobDetails;
	}
	
}
