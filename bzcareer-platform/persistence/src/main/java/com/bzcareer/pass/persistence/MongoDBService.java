package com.bzcareer.pass.persistence;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import org.bson.Document;

import com.mongodb.BasicDBObject;
import com.mongodb.client.MongoCollection;

public class MongoDBService {

	public List<SearchResults> query(String keyword, String local, int num) {
		// TODO: Get search results from MongoDB remotely and query the jobs
		if (isValid(keyword) && isRealLocation(local)) {

		}
		return new ArrayList<SearchResults>();
	}

	private boolean isRealLocation(String local) {
		// TODO Check database to confirm that the location exists in Canada.
		// They may use a city or a province.
		// Check for null
		return true;
	}

	private boolean isValid(String keyword) {
		// TODO Make sure the the keyword is not undefined or null
		// TODO Check for null
		return true;
	}

	public List<SearchResults> queryByCompany(String company, String role,
			String location, int page) {
		return new ArrayList<SearchResults>();
	}

	public List<String> queryAutocomplete(String starts_with, String country) {

		MongoCollection<Document> cities = null;
		// TODO: Need to pull keywords from CAUrlDB.newCanadaMap.find({city:''})
		if (country.equalsIgnoreCase("Canada")) {
			cities = Driver.connect("CAUrlDB", "newCanadaMap");
		} else if (country.equalsIgnoreCase("US")) {
			cities = Driver.connect("USAUrlDB", "newUSAMap");
		}
		BasicDBObject q = new BasicDBObject();
		q.put("City", Pattern.compile(starts_with));
		cities.find(q);
		return new ArrayList<String>();
	}

}
