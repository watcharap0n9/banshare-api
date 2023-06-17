package com.banshare.api.dao;

import java.util.List;

import com.banshare.api.model.TransactionDate;
import com.banshare.api.model.Transactions;

public interface TransactionDao {
	int save(Transactions transaction);
	int update(Transactions transaction);
	int delete(int transactionId);
	int close(int transactionId);
	int open(int transactionId);
	int prepaid(int transactionId, int installmentId);
	Transactions findByTransactionId(int transactionId);
	List<TransactionDate> findTransactionByDate(String startDate, String endDate);
	List<Transactions> findTransactionByDateAndCustomerId(int customerId, String startDate, String endDate);
	List<Transactions> findAllTransaction();
	List<Transactions> findByCustomerId(int customerId);
	List<Transactions> findByCustomerIdAndDate(int customerId, String date);
	int prepaidByInstallmentId(int transactionId, List<Integer> installmentId);
}
