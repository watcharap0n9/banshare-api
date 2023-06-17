package com.banshare.api.service;

import java.util.List;

import com.banshare.api.model.InstallmentDueDate;
import com.banshare.api.model.TransactionDate;
import com.banshare.api.model.TransactionInstallment;
import com.banshare.api.model.Transactions;
import com.banshare.api.payload.request.TransactionRequest;

public interface TransactionService {

	int createTransaction(TransactionRequest transaction) throws Exception;
	int updateTransaction(int transactionId, TransactionRequest transaction) throws Exception;
	Transactions findByTransactionId(int transactionId);
	List<Transactions> findByTransactionCustomerIdAndDate(int customerId, String date);
	List<Transactions> findByTransactionCustomerId(int customerId);
	List<TransactionDate> findTransactionByDate(String startDate, String endDate);
	int deleteTransactionByTransactionId(int transactionId);
	int closeTransactionByTransactionId(int transactionId);
	int openTransactionByTransactionId(int transactionId);
	int prepaidTransaction(int transactionId, int installmentId);
	int prepaidByInstallmentId(int transactionId, List<Integer> installmentId);
	List<Transactions> findAllTransaction();
	List<TransactionInstallment> findInstallmentByTransactionId(int transactionId);
	List<InstallmentDueDate> findDueDateToday();
	List<InstallmentDueDate> findDueDateByDate(String date);
	List<TransactionInstallment> getInstallmentByCustomeIdAndDate(int customerId, String date);
	List<Transactions> findTransactionByDateAndCustomerId(int customerId, String startDate, String endDate);
}
