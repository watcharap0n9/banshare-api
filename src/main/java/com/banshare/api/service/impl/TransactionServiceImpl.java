package com.banshare.api.service.impl;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.banshare.api.dao.CustomerDao;
import com.banshare.api.dao.TransactionDao;
import com.banshare.api.dao.TransactionInstallmentDao;
import com.banshare.api.model.Customers;
import com.banshare.api.model.InstallmentDueDate;
import com.banshare.api.model.TransactionDate;
import com.banshare.api.model.TransactionInstallment;
import com.banshare.api.model.Transactions;
import com.banshare.api.payload.request.InstallmentRequest;
import com.banshare.api.payload.request.TransactionRequest;
import com.banshare.api.service.TransactionService;

@Service
public class TransactionServiceImpl implements TransactionService {
	private static final Logger logger = LoggerFactory.getLogger(TransactionServiceImpl.class);

	@Autowired
	TransactionDao transactionDao;

	@Autowired
	CustomerDao customerDao;

	@Autowired
	TransactionInstallmentDao installmentDao;

	@Override
	@Transactional
	public int createTransaction(TransactionRequest transaction) throws Exception {
		// Validate
		if (transaction.getContractPeriod() != transaction.getInstallment().size()) {
			throw new Exception("Invalid ContractPeriod");
		}
		
		if (transaction.getCustomerName().size() == 0) {
			throw new Exception("Invalid CustomerName");
		}

		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy", Locale.US);
		Calendar cal = Calendar.getInstance();
		Date contractFirstDueDate = null;
		Date createDate = null;
		try {
			contractFirstDueDate = formatter.parse(transaction.getFirstDueDate());
			cal.setTime(contractFirstDueDate);
			
			createDate = formatter.parse(transaction.getCreateDate());
		} catch (ParseException e) {
			throw new Exception("Invalid Date format");
		}
		if (createDate == null) {
			createDate = new Date();
		}
		
		int transactionType = transaction.getTransactionType();
		String description = transaction.getDescription();
		int interestType = transaction.getInterestType();
		BigDecimal interestRate = transaction.getInterestRate();
		int paymentType = transaction.getPaymentType();
		int paymentDate = transaction.getPaymentDate();
		String paymentDateSpecific = transaction.getPaymentDateSpecific();
		int daily = transaction.getDaily();
		String remark = transaction.getRemark();
		BigDecimal principle = transaction.getPrinciple();
		BigDecimal total = transaction.getTotal();
		BigDecimal firstDownAmt = transaction.getFirstDownAmt();
		BigDecimal remaining = transaction.getRemaining();
		int contractPeriod = transaction.getContractPeriod();
		BigDecimal installmentAmt = transaction.getInstallmentAmt();
		BigDecimal income = transaction.getIncome();
		
		List<Integer> customers = new ArrayList<>();
		int sum = 0;
		try {
			
		} catch (Exception e) {
			
		}
		for (int i = 0; i < transaction.getCustomerName().size(); i++) {
			// Register customer
			Customers cust = new Customers();
			cust.setName(transaction.getCustomerName().get(i));
			int customerId = customerDao.saveAndGetId(cust);
			customers.add(customerId);
			
			// insert transaction
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
			transactions.setCreateDate(createDate);
			transactions.setPaymentDateSpecific(paymentDateSpecific);
			int transactionId = transactionDao.save(transactions);
			
			// insert installment
			List<TransactionInstallment> transactionInstallments = new ArrayList<>();
			for (int j = 0; j < transaction.getInstallment().size(); j++) {
				InstallmentRequest req = transaction.getInstallment().get(j);

				TransactionInstallment installment = new TransactionInstallment();
				installment.setTransactionId(transactionId);
				installment.setInstallmentNo(req.getInstallmentNo());
				installment.setInstallmentAmt(req.getInstallmentAmt());
				installment.setDueDate(req.getDueDate());
				transactionInstallments.add(installment);
			}
			int result = installmentDao.batchInsert(transactionInstallments);
			if (result == transactionInstallments.size()) {
				sum += 1;
			} else {
				logger.error("result != transactionInstallments.size()");
			}
		}
		
		return sum;
	}

	@Override
	@Transactional
	public int updateTransaction(int transactionId, TransactionRequest transaction) throws Exception {
		// Validate
		if (transaction.getContractPeriod() != transaction.getInstallment().size()) {
			throw new Exception("Invalid ContractPeriod");
		}
		
		if (transaction.getCustomerName().size() == 0) {
			throw new Exception("Invalid CustomerName");
		}

		int deleteRows = installmentDao.delete(transactionId);
		logger.info("deleteRows = " + deleteRows);
		
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy", Locale.US);
		Calendar cal = Calendar.getInstance();
		Date contractFirstDueDate = null;
		Date createDate = null;
		try {
			contractFirstDueDate = formatter.parse(transaction.getFirstDueDate());
			cal.setTime(contractFirstDueDate);
			
			createDate = formatter.parse(transaction.getCreateDate());
		} catch (ParseException e) {
			logger.error("Invalid Date format : " + transaction.getFirstDueDate());
			logger.error("Invalid Date format : " + transaction.getCreateDate());
			logger.error("Actual Date format : dd-MM-yyyy (ex. 29-05-2023)");
			throw new Exception("Invalid Date format");
		}
		if (createDate == null) {
			createDate = new Date();
		}
		
		int transactionType = transaction.getTransactionType();
		String description = transaction.getDescription();
		int interestType = transaction.getInterestType();
		BigDecimal interestRate = transaction.getInterestRate();
		int paymentType = transaction.getPaymentType();
		int paymentDate = transaction.getPaymentDate();
		String paymentDateSpecific = transaction.getPaymentDateSpecific();
		int daily = transaction.getDaily();
		String remark = transaction.getRemark();
		BigDecimal principle = transaction.getPrinciple();
		BigDecimal total = transaction.getTotal();
		BigDecimal firstDownAmt = transaction.getFirstDownAmt();
		BigDecimal remaining = transaction.getRemaining();
		int contractPeriod = transaction.getContractPeriod();
		BigDecimal installmentAmt = transaction.getInstallmentAmt();
		BigDecimal income = transaction.getIncome();
		
		List<Integer> customers = new ArrayList<>();
		int sum = 0;
		for (int i = 0; i < transaction.getCustomerName().size(); i++) {
			// Register customer
			Customers cust = new Customers();
			cust.setName(transaction.getCustomerName().get(i));
			int customerId = customerDao.saveAndGetId(cust);
			customers.add(customerId);
			
			// insert transaction
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
			transactions.setCreateDate(createDate);
			transactions.setPaymentDateSpecific(paymentDateSpecific);
			//int transactionId = transactionDao.save(transactions);
			
			// insert installment
			List<TransactionInstallment> transactionInstallments = new ArrayList<>();
			for (int j = 0; j < transaction.getInstallment().size(); j++) {
				InstallmentRequest req = transaction.getInstallment().get(j);

				TransactionInstallment installment = new TransactionInstallment();
				installment.setTransactionId(transactionId);
				installment.setInstallmentNo(req.getInstallmentNo());
				installment.setInstallmentAmt(req.getInstallmentAmt());
				installment.setDueDate(req.getDueDate());
				transactionInstallments.add(installment);
			}
			int result = installmentDao.batchInsert(transactionInstallments);
			if (result == transactionInstallments.size()) {
				sum += 1;
			} else {
				logger.error("result != transactionInstallments.size()");
			}
		}
		
		return sum;
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
	public List<InstallmentDueDate> findDueDateToday() {
		return installmentDao.findDueDateToday2();
	}

	@Override
	public List<InstallmentDueDate> findDueDateByDate(String date) {
		return installmentDao.findDueDateByDate(date);
	}

	@Override
	public List<TransactionInstallment> getInstallmentByCustomeIdAndDate(int customerId, String date) {
		return installmentDao.findInstallmentByCustomeIdAndDate(customerId, date);
	}

	@Override
	public List<Transactions> findByTransactionCustomerIdAndDate(int customerId, String date) {
		return transactionDao.findByCustomerIdAndDate(customerId, date);
	}

	@Override
	public List<Transactions> findByTransactionCustomerId(int customerId) {
		return transactionDao.findByCustomerId(customerId);
	}

	@Override
	public int closeTransactionByTransactionId(int transactionId) {
		return transactionDao.close(transactionId);
	}

	@Override
	public int openTransactionByTransactionId(int transactionId) {
		return transactionDao.open(transactionId);
	}

	@Override
	public int prepaidTransaction(int transactionId, int installmentId) {
		return transactionDao.prepaid(transactionId, installmentId);
	}
	
	@Override
	public int prepaidByInstallmentId(int transactionId, List<Integer> installmentId) {
		return transactionDao.prepaidByInstallmentId(transactionId, installmentId);
	}

	@Override
	public List<TransactionDate> findTransactionByDate(String startDate, String endDate) {
		return transactionDao.findTransactionByDate(startDate, endDate);
	}

	@Override
	public List<Transactions> findTransactionByDateAndCustomerId(int customerId, String startDate, String endDate) {
		return transactionDao.findTransactionByDateAndCustomerId(customerId, startDate, endDate);
	}

}
