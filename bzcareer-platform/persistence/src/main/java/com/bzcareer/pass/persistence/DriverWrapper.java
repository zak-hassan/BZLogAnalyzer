package com.bzcareer.pass.persistence;

import java.util.Date;

import org.bson.Document;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class DriverWrapper {

	public static void main(String[] args) {
		Date start = new Date(System.currentTimeMillis());
		MongoCollection<Document> collection = connect("ResultsIndexCanada",
				"FinishedJobsIndexed");
		for (Document document : collection.find()) {
			System.out.println(document.toString());
		}
		System.out.println(" Done !!! ");
		Date end = new Date();
		System.out.println(" Started : " + (start));
		System.out.println(" Ended : " + (end));

	}

	static MongoCollection<Document> connect(String db, String collection) {
		MongoClient mongoClient = new MongoClient("bzcareer.com", 27017);
		MongoDatabase database = mongoClient.getDatabase(db);
		MongoCollection<Document> col = database.getCollection(collection);
		return col;
	}
}
