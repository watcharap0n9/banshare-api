package com.banshare.api.service;

import java.util.List;

import com.banshare.api.model.TransactionInstallment;
import com.banshare.api.model.Transactions;
import com.banshare.api.payload.request.TransactionRequest;

public interface TransactionService {

	int createTransaction(TransactionRequest transaction);
	Transactions findByTransactionId(int transactionId);
	int deleteTransactionByTransactionId(int transactionId);
	List<Transactions> findAllTransaction();
	List<TransactionInstallment> findInstallmentByTransactionId(int transactionId);
	List<TransactionInstallment> findDueDateToday();
}
