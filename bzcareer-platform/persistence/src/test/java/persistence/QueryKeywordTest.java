package persistence;

import org.junit.Test;

import com.bzcareer.paas.persistence.MongoDBService;
import com.bzcareer.paas.persistence.SearchResults;

public class QueryKeywordTest {

	@Test
	public void queryTest() throws Exception {
		MongoDBService service = new MongoDBService();
		SearchResults results=service.query("Java", "BRITISH COLUMBIA", 1);
		System.out.println(results);
		System.out.println(results.getJobs().size());
	}
}
