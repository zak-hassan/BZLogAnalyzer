package com.bzcareer.paas.persistence;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

public class SearchResults {
	private List<Job> jobs;
	private int TotalJobs;
	private int TotalPages;
	private Sidebar sideBar;

	public SearchResults() {
		jobs = new ArrayList<Job>();
	}

	public void addJob(Job job) {
		getJobs().add(job);
	}
	public void addAll(Collection<? extends Job> list){
		getJobs().addAll(list);
	}
	public int getTotalJobs() {
		return TotalJobs;
	}

	public void setTotalJobs(int totalJobs) {
		TotalJobs = totalJobs;
	}

	public int getTotalPages() {
		return TotalPages;
	}

	public void setTotalPages(int totalPages) {
		TotalPages = totalPages;
	}

	public Sidebar getSideBar() {
		return sideBar;
	}

	public void setSideBar(Sidebar sideBar) {
		this.sideBar = sideBar;
	}

	public List<Job> getJobs() {
		return jobs;
	}

	public void setJobs(List<Job> jobs) {
		this.jobs = jobs;
	}

	@Override
	public String toString() {
		return "SearchResults [jobs=" + jobs + ", TotalJobs=" + TotalJobs
				+ ", TotalPages=" + TotalPages + ", sideBar=" + sideBar + "]";
	}

}
