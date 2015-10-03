package com.bzcareer.paas.metrics;

import java.io.IOException;

import com.maxmind.geoip.Location;
import com.maxmind.geoip.LookupService;

public class GeoLookup {

	public void lookUpByIp(String ip) {
		LookupService cl;
		try {
			cl = new LookupService("etc/GeoLiteCity.dat",
					LookupService.GEOIP_MEMORY_CACHE
							| LookupService.GEOIP_CHECK_CACHE);
			Location location = cl.getLocation( ip);
		} catch (IOException e) {
 			e.printStackTrace();
		}

	}
}
