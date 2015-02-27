package com.bzcareer.pass.persistence;

import org.bson.Document;

import com.mongodb.DB;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class Driver {
	
	public static void main(String[] args) {
		MongoCollection<Document> collection = connect("JobPostsDB","myJobPosts");
		for (Document document : collection.find()) {
			System.out.println(document.toString());
		}
	}
	
	static MongoCollection<Document> connect(String db, String collection) {
		MongoClient mongoClient = new MongoClient("bzcareer.com", 28017);
		MongoDatabase database = mongoClient.getDatabase(db);
		MongoCollection<Document> col = database.getCollection(collection);
		return col;
	}
}
