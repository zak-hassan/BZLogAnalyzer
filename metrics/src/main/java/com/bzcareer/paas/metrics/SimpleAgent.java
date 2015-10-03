package com.bzcareer.paas.metrics;

import java.lang.management.ManagementFactory;

import javax.management.MBeanServer;
import javax.management.ObjectName;

import com.bzcareer.paas.metrics.jmx.MongoDB;

public class SimpleAgent {
	private MBeanServer mbs = null;
	 
	   public SimpleAgent() {
	 
	      // Get the platform MBeanServer
	       mbs = ManagementFactory.getPlatformMBeanServer();
	 
	      // Unique identification of MBeans
//	      Hello helloBean = new Hello();
	       MongoDB mongoDBean= new MongoDB();
	      ObjectName helloName = null;
	 
	      try {
	         // Uniquely identify the MBeans and register them with the platform MBeanServer 
	         helloName = new ObjectName("BZCareer:name=JobSearch");
	         mbs.registerMBean(mongoDBean, helloName);
	      } catch(Exception e) {
	         e.printStackTrace();
	      }
	   }
	 
	   // Utility method: so that the application continues to run
	   private static void waitForEnterPressed() {
	      try {
	         System.out.println("Press  to continue...");
	         System.in.read();
	      } catch (Exception e) {
	         e.printStackTrace();
	      }
	    }
	 
	   public static void main(String argv[]) {
	      SimpleAgent agent = new SimpleAgent();
	      System.out.println("SimpleAgent is running...");
	      SimpleAgent.waitForEnterPressed();
	   }
}
