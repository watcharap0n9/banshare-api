package com.banshare.api.dao;

import java.util.List;

import com.banshare.api.model.Transactions;

public interface TransactionDao {
	int save(Transactions transaction);
	int update(Transactions transaction);
	int delete(int transactionId);
	Transactions findByTransactionId(int transactionId);
	List<Transactions> findAllTransaction();
	List<Transactions> findByCustomerId(int customerId);
}
