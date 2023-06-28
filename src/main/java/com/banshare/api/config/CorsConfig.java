package com.banshare.api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
					.allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS")
					.allowedHeaders("X-Requested-With, X-FORWARDED-FOR, Content-Type, Authorization, Origin, Accept, " + 
							"Access-Control-Request-Method, Access-Control-Request-Headers, User-Agent")
					.allowedOriginPatterns("*")
					.allowCredentials(true);

			}
		};
	}
	
}
