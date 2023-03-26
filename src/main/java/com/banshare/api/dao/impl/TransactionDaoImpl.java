package com.banshare.api.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import com.banshare.api.dao.TransactionDao;
import com.banshare.api.model.Transactions;

@Repository
public class TransactionDaoImpl implements TransactionDao {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Autowired
	private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

	private final String SQL_INSERT = "INSERT INTO TRANSACTIONS (TRANSACTION_TYPE, CUSTOMER_ID, DESCRIPTION, INTEREST_TYPE, INTEREST_RATE, PAYMENT_TYPE, PAYMENT_DATE, "
									+ "DAILY, IS_CLOSED, REMARK, PRINCIPLE, TOTAL, CONTRACT_PERIOD, FIRST_DOWN_AMT, REMAINING, INSTALLMENT_AMT, INCOME, "
									+ "CONTRACT_FIRST_DUE_DATE, CONTRACT_END_DATE) "
									+ "VALUES (:TRANSACTION_TYPE, :CUSTOMER_ID, :DESCRIPTION, :INTEREST_TYPE, :INTEREST_RATE, :PAYMENT_TYPE, :PAYMENT_DATE, "
									+ ":DAILY, :IS_CLOSED, :REMARK, :PRINCIPLE, :TOTAL, :CONTRACT_PERIOD, :FIRST_DOWN_AMT, :REMAINING, :INSTALLMENT_AMT, :INCOME, "
									+ ":CONTRACT_FIRST_DUE_DATE, :CONTRACT_END_DATE)";
	private final String SQL_DELETE_TRANSACTION = "UPDATE TRANSACTIONS SET STATUS=0 WHERE TRANSACTION_ID = :TRANSACTION_ID";
	private final String SQL_FIND_BY_TRANSACTION_ID = "SELECT * FROM TRANSACTIONS WHERE STATUS=1 AND TRANSACTION_ID=?";
	private final String SQL_FIND_ALL_TRANSACTION = "SELECT * FROM TRANSACTIONS WHERE STATUS=1";
	private final String SQL_FIND_BY_CUSTOMER_ID = "SELECT * FROM TRANSACTIONS WHERE STATUS=1 AND CUSTOMER_ID = :CUSTOMER_ID";

	@Override
	public int save(Transactions transaction) {
		SqlParameterSource parameters = new MapSqlParameterSource()
				.addValue("TRANSACTION_TYPE", transaction.getTransactionType())
				.addValue("CUSTOMER_ID", transaction.getCustomerId())
				.addValue("DESCRIPTION", transaction.getDescription())
				.addValue("INTEREST_TYPE", transaction.getInterestType())
				.addValue("INTEREST_RATE", transaction.getInterestRate())
				.addValue("PAYMENT_TYPE", transaction.getPaymentType())
				.addValue("PAYMENT_DATE", transaction.getPaymentDate())
				.addValue("DAILY", transaction.getDaily())
				.addValue("IS_CLOSED", false)
				.addValue("REMARK", transaction.getRemark())
				.addValue("PRINCIPLE", transaction.getPrinciple())
				.addValue("TOTAL", transaction.getTotal())
				.addValue("CONTRACT_PERIOD", transaction.getContractPeriod())
				.addValue("FIRST_DOWN_AMT", transaction.getFirstDownAmt())
				.addValue("REMAINING", transaction.getRemaining())
				.addValue("INSTALLMENT_AMT", transaction.getInstallmentAmt())
				.addValue("INCOME", transaction.getIncome())
				.addValue("CONTRACT_FIRST_DUE_DATE", transaction.getContractFirstDueDate())
				.addValue("CONTRACT_END_DATE", transaction.getContractEndDate());

		KeyHolder holder = new GeneratedKeyHolder();
		int result = namedParameterJdbcTemplate.update(SQL_INSERT, parameters, holder);
		System.out.println("Save Transaction result : " + result);

		return holder.getKey().intValue();
	}

	@Override
	public int update(Transactions transaction) {
		return 0;
	}

	@Override
	public int delete(int transactionId) {
		SqlParameterSource parameters = new MapSqlParameterSource().addValue("TRANSACTION_ID", transactionId);

		int result = namedParameterJdbcTemplate.update(SQL_DELETE_TRANSACTION, parameters);
		System.out.println("Delete TRANSACTION_ID : " + transactionId + " , result = " + result);
		return result;
	}

	@Override
	public Transactions findByTransactionId(int transactionId) {
		return jdbcTemplate.queryForObject(SQL_FIND_BY_TRANSACTION_ID,
		          BeanPropertyRowMapper.newInstance(Transactions.class), transactionId);
	}

	@Override
	public List<Transactions> findAllTransaction() {
		return jdbcTemplate.query(SQL_FIND_ALL_TRANSACTION, BeanPropertyRowMapper.newInstance(Transactions.class));
	}

	@Override
	public List<Transactions> findByCustomerId(int customerId) {
		System.out.println("findByCustomerId : " + customerId);
		MapSqlParameterSource parameters = new MapSqlParameterSource();
		parameters.addValue("CUSTOMER_ID", customerId);
		List<Transactions> result = namedParameterJdbcTemplate.query(SQL_FIND_BY_CUSTOMER_ID, parameters, BeanPropertyRowMapper.newInstance(Transactions.class));
		System.out.println("result size : " + result.size());
		return result;
	}

}
