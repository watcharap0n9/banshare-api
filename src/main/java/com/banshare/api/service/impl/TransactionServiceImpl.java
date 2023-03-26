package com.banshare.api.service.impl;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.banshare.api.dao.TransactionDao;
import com.banshare.api.dao.TransactionInstallmentDao;
import com.banshare.api.model.TransactionInstallment;
import com.banshare.api.model.Transactions;
import com.banshare.api.payload.request.TransactionRequest;
import com.banshare.api.service.TransactionService;

@Service
public class TransactionServiceImpl implements TransactionService {
	
	@Autowired
	TransactionDao transactionDao;

	@Autowired
	TransactionInstallmentDao installmentDao;

	@Override
	@Transactional
	public int createTransaction(TransactionRequest transaction) {
		// First DueDate cast to Date
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy", Locale.US);
		Calendar cal = Calendar.getInstance();
		
		int transactionType = transaction.getTransactionType();
		int customerId = transaction.getCustomerId();
		String description = transaction.getDescription();
		int interestType = transaction.getTransactionType();
		BigDecimal interestRate = transaction.getInterestRate();
		int paymentType = transaction.getPaymentType();
		int paymentDate = transaction.getPaymentDate();
		int daily = transaction.getDaily();
		String remark = transaction.getRemark();
		BigDecimal principle = transaction.getPrinciple();
		BigDecimal total = transaction.getTotal();
		BigDecimal firstDownAmt = transaction.getFirstDownAmt();
		BigDecimal remaining = transaction.getRemaining();
		int contractPeriod = transaction.getContractPeriod();
		BigDecimal installmentAmt = transaction.getInstallmentAmt();
		BigDecimal income = transaction.getIncome();
		Date contractFirstDueDate = null;
		try {
			contractFirstDueDate = formatter.parse(transaction.getFirstDueDate());
			cal.setTime(contractFirstDueDate);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		Date contractEndDate = null;
		// Calculate end date
		
		List<TransactionInstallment> listInstallment = new ArrayList<>();
		TransactionInstallment firstInstallment = new TransactionInstallment();
		firstInstallment.setTransactionId(1);
		firstInstallment.setInstallmentNo(1);
		firstInstallment.setInstallmentAmt(installmentAmt);
		firstInstallment.setDueDate(contractFirstDueDate);
		listInstallment.add(firstInstallment);

		int calendarAddType = paymentType == 1 ? Calendar.DAY_OF_MONTH : Calendar.MONTH;
		int addValue = daily > 0 ? daily : 1;
		for (int i = 0; i < contractPeriod - 1; i++) {
			cal.add(calendarAddType, addValue);
			Date dueDate = cal.getTime();
			if (i == contractPeriod - 2) contractEndDate = dueDate;

			TransactionInstallment installment = new TransactionInstallment();
			installment.setTransactionId(1);
			installment.setInstallmentNo(i + 2);
			installment.setInstallmentAmt(installmentAmt);
			installment.setDueDate(dueDate);
			listInstallment.add(installment);
		}
		
		Transactions transactions = new Transactions();
		transactions.setTransactionType(transactionType);
		transactions.setCustomerId(customerId);
		transactions.setDescription(description);
		transactions.setInterestType(interestType);
		transactions.setInterestRate(interestRate);
		transactions.setPaymentType(paymentType);
		transactions.setPaymentDate(paymentDate);
		transactions.setDaily(daily);
		transactions.setRemark(remark);
		transactions.setPrinciple(principle);
		transactions.setTotal(total);
		transactions.setFirstDownAmt(firstDownAmt);
		transactions.setRemaining(remaining);
		transactions.setContractPeriod(contractPeriod);
		transactions.setInstallmentAmt(installmentAmt);
		transactions.setIncome(income);
		transactions.setContractFirstDueDate(contractFirstDueDate);
		transactions.setContractEndDate(contractEndDate);
		int transactionId = transactionDao.save(transactions);
		transactions.setTransactionId(transactionId);
		System.out.println();
		System.out.println(transactions);
		
		for (int i = 0; i < listInstallment.size(); i++) {
			TransactionInstallment installment = listInstallment.get(i);
			installment.setTransactionId(transactionId);
			installmentDao.save(installment);
		}
		
		return transactionId;
	}

	@Override
	public Transactions findByTransactionId(int transactionId) {
		return transactionDao.findByTransactionId(transactionId);
	}

	@Override
	public int deleteTransactionByTransactionId(int transactionId) {
		installmentDao.delete(transactionId);
		return transactionDao.delete(transactionId);
	}

	@Override
	public List<Transactions> findAllTransaction() {
		return transactionDao.findAllTransaction();
	}

	@Override
	public List<TransactionInstallment> findInstallmentByTransactionId(int transactionId) {
		return installmentDao.findByTransactionId(transactionId);
	}

	@Override
	public List<TransactionInstallment> findDueDateToday() {
		return installmentDao.findDueDateToday();
	}

}
