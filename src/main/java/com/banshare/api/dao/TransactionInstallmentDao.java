package com.banshare.api.dao;

import java.util.List;

import com.banshare.api.model.TransactionInstallment;

public interface TransactionInstallmentDao {
	int save(TransactionInstallment installment);
	int update(TransactionInstallment installment);
	int delete(int transactionId);
	List<TransactionInstallment> findByTransactionId(int transactionId);
	List<TransactionInstallment> findDueDateToday();
}
