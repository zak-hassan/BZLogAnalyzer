package com.bzcareer.paas.metrics;

import java.io.IOException;

import com.maxmind.geoip.Location;
import com.maxmind.geoip.LookupService;

public class GeoLookup {

	public void lookUpByIp() {
		LookupService cl;
		try {
			cl = new LookupService("etc/GeoLiteCity.dat",
					LookupService.GEOIP_MEMORY_CACHE
							| LookupService.GEOIP_CHECK_CACHE);
			Location location = cl.getLocation("52.0.37.122");
		} catch (IOException e) {
 			e.printStackTrace();
		}

	}
}
