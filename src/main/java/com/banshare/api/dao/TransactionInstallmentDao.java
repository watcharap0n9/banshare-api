package com.banshare.api.dao;

import java.util.List;

import com.banshare.api.model.InstallmentDueDate;
import com.banshare.api.model.TransactionInstallment;

public interface TransactionInstallmentDao {
	int save(TransactionInstallment installment);
	int batchInsert(List<TransactionInstallment> installments);
	int update(TransactionInstallment installment);
	int delete(int transactionId);
	List<TransactionInstallment> findByTransactionId(int transactionId);
	List<InstallmentDueDate> findDueDateToday2();
	List<InstallmentDueDate> findDueDateByDate(String date);
	List<TransactionInstallment> findInstallmentByCustomeIdAndDate(int customerId, String date);
}
