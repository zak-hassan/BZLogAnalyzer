package persistence;

import org.junit.Test;

import com.bzcareer.pass.persistence.MongoDBService;

public class QueryKeywordTest {

	@Test
	public void queryTest() throws Exception {
		MongoDBService service = new MongoDBService();
		System.out.println(service.query("Java", "BRITISH COLUMBIA", 1));
		 
	}
}
