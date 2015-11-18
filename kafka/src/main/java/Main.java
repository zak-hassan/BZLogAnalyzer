
import java.util.Properties;

import kafka.javaapi.producer.Producer;
import kafka.producer.KeyedMessage;
import kafka.producer.ProducerConfig;


public class Main {


		  private static Producer<Integer, String> producer;
		    private final Properties properties = new Properties();

		    public Main() {
		        properties.put("metadata.broker.list", "localhost:9092");
		        properties.put("serializer.class", "kafka.serializer.StringEncoder");
		        properties.put("request.required.acks", "1");
		        producer = new Producer<>(new ProducerConfig(properties));
		    }

		    public static void main(String[] args) {
		        new Main();
		        String topic = "kafkatopic";
		        String msg = "I love you long time!!";
		        KeyedMessage<Integer, String> data = new KeyedMessage<>(topic, msg);
		        producer.send(data);
		        producer.close();
		    }

}
