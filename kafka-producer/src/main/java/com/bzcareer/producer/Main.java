package com.bzcareer.producer;
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
		        
		        properties.put("request.required.acks", "1");// @see REQUIRED_ACK
		        //	properties.put("compression.codec", "none");  
		        //	possible values: none, gzip, and snappy.
		        //properties.put("batch.num.messages","10"); // If you decide to batch your messages for async ops.
		        producer = new Producer<>(new ProducerConfig(properties));
		    }

		    public static void main(String[] args) {
		        new Main();
		        String topic = "kafkatopic";
		        String msg = "I I love you long time!love you!";
		        KeyedMessage<Integer, String> data = new KeyedMessage<>(topic, msg);
		        producer.send(data);
		        producer.close();
		    }

}
