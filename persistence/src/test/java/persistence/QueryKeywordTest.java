package persistence;

import org.junit.Test;

import com.bzcareer.paas.persistence.MongoDBService;
import com.bzcareer.paas.persistence.SearchResults;

public class QueryKeywordTest {

	@Test
	public void queryTest() throws Exception {
		MongoDBService service = new MongoDBService();
		SearchResults results=service.query("Analyst", "BRITISH COLUMBIA", 9);
//		System.out.println(results);
 		System.out.println("Total Size Of JobList: "+ results.getJobs().size());
 		System.out.println("TotalJobs: "+results.getTotalJobs());
 		System.out.println("Pages: "+results.getTotalPages());
	}
}
