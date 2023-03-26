package com.banshare.api.payload.response;

import java.util.List;

import com.banshare.api.model.InterestType;
import com.banshare.api.model.PaymentType;
import com.banshare.api.model.TransactionType;

public class MasterDataResponse {
	private List<InterestType> interestType;
	private List<PaymentType> paymentType;
	private List<TransactionType> transactionType;

	public List<InterestType> getInterestType() {
		return interestType;
	}

	public void setInterestType(List<InterestType> interestType) {
		this.interestType = interestType;
	}

	public List<PaymentType> getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(List<PaymentType> paymentType) {
		this.paymentType = paymentType;
	}

	public List<TransactionType> getTransactionType() {
		return transactionType;
	}

	public void setTransactionType(List<TransactionType> transactionType) {
		this.transactionType = transactionType;
	}
	
	
//	private Map<Integer, InterestType> interestType = new HashMap<>();
//	private Map<Integer, PaymentType> paymentType = new HashMap<>();
//	private Map<Integer, TransactionType> transactionType = new HashMap<>();

	//	public Map<Integer, InterestType> getInterestType() {
//		return interestType;
//	}
//
//	public void setInterestType(Map<Integer, InterestType> interestType) {
//		this.interestType = interestType;
//	}
//
//	public Map<Integer, PaymentType> getPaymentType() {
//		return paymentType;
//	}
//
//	public void setPaymentType(Map<Integer, PaymentType> paymentType) {
//		this.paymentType = paymentType;
//	}
//
//	public Map<Integer, TransactionType> getTransactionType() {
//		return transactionType;
//	}
//
//	public void setTransactionType(Map<Integer, TransactionType> transactionType) {
//		this.transactionType = transactionType;
//	}

}
