package com.banshare.api.dao;

import java.util.List;

import com.banshare.api.model.InterestType;
import com.banshare.api.model.PaymentType;
import com.banshare.api.model.TransactionType;

public interface MasterDataDao {

	List<InterestType> getAllInterestType();
	List<PaymentType> getAllPaymentType();
	List<TransactionType> getAllTransactionType();
}
