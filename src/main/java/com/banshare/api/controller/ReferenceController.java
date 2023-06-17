package com.banshare.api.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.banshare.api.payload.response.MasterDataResponse;
import com.banshare.api.service.MasterDataService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ReferenceController {
	private static final Logger logger = LoggerFactory.getLogger(ReferenceController.class);
	
	@Autowired
	MasterDataService masterDataService;

	@GetMapping("/references")
	public ResponseEntity<MasterDataResponse> getAllReferences() {
		logger.info("Get All References");
		try {
			long st = System.currentTimeMillis();
			MasterDataResponse masterDataResponse = masterDataService.getAllReference();
			logger.info("getAllReferences duration : " + (System.currentTimeMillis() - st) + " milliseconds.");
			return new ResponseEntity<>(masterDataResponse, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
