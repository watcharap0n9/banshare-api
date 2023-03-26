package com.banshare.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.banshare.api.cache.CacheMasterData;
import com.banshare.api.dao.MasterDataDao;
import com.banshare.api.payload.response.MasterDataResponse;

@Service
public class MasterDataService {

	@Autowired
	private MasterDataDao masterDataDao;
	
	public MasterDataResponse getAllReference() {
		MasterDataResponse masterData = CacheMasterData.getInstance().get("MASTER_DATA");
		if (masterData == null) {
			masterData = new MasterDataResponse();
			masterData.setInterestType(masterDataDao.getAllInterestType());
			masterData.setPaymentType(masterDataDao.getAllPaymentType());
			masterData.setTransactionType(masterDataDao.getAllTransactionType());
			
			CacheMasterData.getInstance().set("MASTER_DATA", masterData);
		}
		
		return masterData;
	}
}
