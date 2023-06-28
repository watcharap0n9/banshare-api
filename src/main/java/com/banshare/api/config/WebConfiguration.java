package com.banshare.api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {
	
	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/").setViewName("forward:/index.html");
//		registry.addViewController("/login").setViewName("forward:/index.html");
//		registry.addViewController("/main").setViewName("forward:/index.html");
//		registry.addViewController("/search-customer").setViewName("forward:/index.html");
//		registry.addViewController("/account-list").setViewName("forward:/index.html");
//		registry.addViewController("/view-detail").setViewName("forward:/index.html");
	}

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins("*");
    }
}
