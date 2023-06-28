package com.banshare.api.dao.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import com.banshare.api.model.TransactionDate;
import com.banshare.api.model.Transactions;

@Repository
public class TransactionDaoImpl implements TransactionDao {
	private static final Logger logger = LoggerFactory.getLogger(TransactionDaoImpl.class);

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Autowired
	private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

	private final String SQL_INSERT = "INSERT INTO TRANSACTIONS (TRANSACTION_TYPE, CUSTOMER_ID, DESCRIPTION, INTEREST_TYPE, INTEREST_RATE, PAYMENT_TYPE, PAYMENT_DATE, "
									+ "DAILY, IS_CLOSED, REMARK, PRINCIPLE, TOTAL, CONTRACT_PERIOD, FIRST_DOWN_AMT, REMAINING, INSTALLMENT_AMT, INCOME, "
									+ "CONTRACT_FIRST_DUE_DATE, CONTRACT_END_DATE, CREATE_DATE, PAYMENT_DATE_SPECIFIC) "
									+ "VALUES (:TRANSACTION_TYPE, :CUSTOMER_ID, :DESCRIPTION, :INTEREST_TYPE, :INTEREST_RATE, :PAYMENT_TYPE, :PAYMENT_DATE, "
									+ ":DAILY, :IS_CLOSED, :REMARK, :PRINCIPLE, :TOTAL, :CONTRACT_PERIOD, :FIRST_DOWN_AMT, :REMAINING, :INSTALLMENT_AMT, :INCOME, "
									+ ":CONTRACT_FIRST_DUE_DATE, :CONTRACT_END_DATE, :CREATE_DATE, :PAYMENT_DATE_SPECIFIC)";
	private final String SQL_DELETE_TRANSACTION = "UPDATE TRANSACTIONS SET STATUS=0 WHERE TRANSACTION_ID = :TRANSACTION_ID";
	private final String SQL_FIND_BY_TRANSACTION_ID = "SELECT b.name CUSTOMER_NAME,a.* FROM TRANSACTIONS a LEFT JOIN CUSTOMERS b on a.CUSTOMER_ID = b.CUSTOMER_ID WHERE a.STATUS=1 AND a.TRANSACTION_ID=? ";
	private final String SQL_FIND_ALL_TRANSACTION = "SELECT * FROM TRANSACTIONS WHERE STATUS=1";
	private final String SQL_FIND_BY_CUSTOMER_ID = "SELECT b.name CUSTOMER_NAME,a.* FROM TRANSACTIONS a LEFT JOIN CUSTOMERS b on a.CUSTOMER_ID = b.CUSTOMER_ID WHERE a.STATUS=1 AND a.CUSTOMER_ID = :CUSTOMER_ID";
	private final String SQL_FIND_BY_CUSTOMER_ID_AND_DATE = "SELECT c.name CUSTOMER_NAME, b.* FROM TRANSACTION_INSTALLMENT a LEFT JOIN TRANSACTIONS b on a.TRANSACTION_ID = b.TRANSACTION_ID LEFT JOIN CUSTOMERS c on b.CUSTOMER_ID = c.CUSTOMER_ID WHERE a.STATUS = 1 AND b.IS_CLOSED = 0 AND b.STATUS = 1 AND a.IS_PREPAID = 0 AND b.CUSTOMER_ID = :CUSTOMER_ID AND DATE_FORMAT(a.DUE_DATE, '%d%m%Y') = DATE_FORMAT( STR_TO_DATE(:DATE, '%d-%m-%Y'), '%d%m%Y' )";

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
				.addValue("CONTRACT_END_DATE", transaction.getContractEndDate())
				.addValue("CREATE_DATE", transaction.getCreateDate())
				.addValue("PAYMENT_DATE_SPECIFIC", transaction.getPaymentDateSpecific());

		KeyHolder holder = new GeneratedKeyHolder();
		int result = namedParameterJdbcTemplate.update(SQL_INSERT, parameters, holder);
		logger.info("Save Transaction result : " + result);

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
		logger.info("Delete TRANSACTION_ID : " + transactionId + " , result = " + result);
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
		logger.info("findByCustomerId : " + customerId);
		MapSqlParameterSource parameters = new MapSqlParameterSource();
		parameters.addValue("CUSTOMER_ID", customerId);
		logger.debug("sql : " + SQL_FIND_BY_CUSTOMER_ID);
		logger.debug("parameter : " + parameters);
		List<Transactions> result = namedParameterJdbcTemplate.query(SQL_FIND_BY_CUSTOMER_ID, parameters, BeanPropertyRowMapper.newInstance(Transactions.class));
		logger.info("result size : " + result.size());
		return result;
	}

	@Override
	public List<Transactions> findByCustomerIdAndDate(int customerId, String date) {
		logger.info("findByCustomerIdAndDate : " + customerId + " , date : " + date);
		MapSqlParameterSource parameters = new MapSqlParameterSource();
		parameters.addValue("CUSTOMER_ID", customerId);
		parameters.addValue("DATE", date);
		logger.debug("sql : " + SQL_FIND_BY_CUSTOMER_ID_AND_DATE);
		logger.debug("parameter : " + parameters);
		List<Transactions> result = namedParameterJdbcTemplate.query(SQL_FIND_BY_CUSTOMER_ID_AND_DATE, parameters, BeanPropertyRowMapper.newInstance(Transactions.class));
		logger.info("result size : " + result.size());
		return result;
	}

	@Override
	public int close(int transactionId) {
		logger.info("close transaction id : " + transactionId);
		MapSqlParameterSource paramMap = new MapSqlParameterSource();
		paramMap.addValue("TRANSACTION_ID", transactionId);
		String sql = "UPDATE TRANSACTIONS SET IS_CLOSED = TRUE WHERE TRANSACTION_ID = :TRANSACTION_ID ";
		logger.debug("sql : " + sql);
		logger.debug("parameter : " + paramMap);
		int result = namedParameterJdbcTemplate.update(sql, paramMap);
		logger.info("close transaction result : " + result);

		String sql_installment = "UPDATE TRANSACTION_INSTALLMENT SET IS_PREPAID = TRUE WHERE TRANSACTION_ID = :TRANSACTION_ID AND DUE_DATE > ADDDATE(NOW(), INTERVAL -1 DAY) ";
		logger.debug("sql_installment : " + sql_installment);
		int result_installment = namedParameterJdbcTemplate.update(sql_installment, paramMap);
		logger.info("close result_installment : " + result_installment);
		
		return result;
	}

	@Override
	public int open(int transactionId) {
		logger.info("open transaction id : " + transactionId);
		MapSqlParameterSource paramMap = new MapSqlParameterSource();
		paramMap.addValue("TRANSACTION_ID", transactionId);

		String sql = "UPDATE TRANSACTIONS SET IS_CLOSED = FALSE WHERE TRANSACTION_ID = :TRANSACTION_ID ";
		logger.debug("sql : " + sql);
		logger.debug("parameter : " + paramMap);
		int result = namedParameterJdbcTemplate.update(sql, paramMap);
		logger.info("close transaction result : " + result);

		String sql_installment = "UPDATE TRANSACTION_INSTALLMENT SET IS_PREPAID = FALSE WHERE TRANSACTION_ID = :TRANSACTION_ID ";
		logger.debug("sql_installment : " + sql_installment);
		int result_installment = namedParameterJdbcTemplate.update(sql_installment, paramMap);
		logger.info("close result_installment : " + result_installment);
		
		return result;
	}

	@Override
	public int prepaid(int transactionId, int installmentId) {
		logger.info("prepaid transaction id : " + transactionId + " , installmentId : " + installmentId);
		MapSqlParameterSource paramMap = new MapSqlParameterSource();
		paramMap.addValue("TRANSACTION_ID", transactionId);
		paramMap.addValue("INSTALLMENT_ID", installmentId);

		String sql = "UPDATE TRANSACTION_INSTALLMENT SET IS_PREPAID = NOT IS_PREPAID WHERE TRANSACTION_ID = :TRANSACTION_ID AND INSTALLMENT_ID >= :INSTALLMENT_ID ";
		logger.debug("sql : " + sql);
		logger.debug("parameter : " + paramMap);
		int result = namedParameterJdbcTemplate.update(sql, paramMap);
		logger.info("prepaid transaction result : " + result);
		
		logger.info("close transaction id : " + transactionId);
		MapSqlParameterSource paramMapClose = new MapSqlParameterSource();
		paramMapClose.addValue("TRANSACTION_ID", transactionId);
		String sqlClose = "UPDATE TRANSACTIONS SET IS_CLOSED = TRUE WHERE TRANSACTION_ID = :TRANSACTION_ID ";
		logger.debug("sql : " + sql);
		logger.debug("parameter : " + paramMap);
		int resultClose = namedParameterJdbcTemplate.update(sqlClose, paramMapClose);
		logger.info("close transaction result : " + resultClose);
		
		return result;
	}

	@Override
	public int prepaidByInstallmentId(int transactionId, List<Integer> installmentId) {
		logger.info("prepaid transaction id : " + transactionId + " , installmentId : " + installmentId);
		MapSqlParameterSource paramMap = new MapSqlParameterSource();
		paramMap.addValue("TRANSACTION_ID", transactionId);
		paramMap.addValue("INSTALLMENT_ID", installmentId);

		String sql = "UPDATE TRANSACTION_INSTALLMENT SET IS_PREPAID = NOT IS_PREPAID WHERE TRANSACTION_ID = :TRANSACTION_ID AND INSTALLMENT_ID IN (:INSTALLMENT_ID) ";
		logger.debug("sql : " + sql);
		logger.debug("parameter : " + paramMap);
		int result = namedParameterJdbcTemplate.update(sql, paramMap);
		logger.info("prepaid transaction result : " + result);
		
		return result;
	}

	@Override
	public List<TransactionDate> findTransactionByDate(String startDate, String endDate) {
		logger.info("findTransactionByDate : " + startDate + " , " + endDate);
		MapSqlParameterSource paramMap = new MapSqlParameterSource();
		paramMap.addValue("START_DATE", startDate);
		paramMap.addValue("END_DATE", endDate);
		
		String sql = "SELECT TRANSACTIONS.CUSTOMER_ID, MAX(CUSTOMERS.NAME) as CUSTOMER_NAME, SUM(TRANSACTIONS.INCOME) as SUM_INCOME, DATE_FORMAT(TRANSACTIONS.CREATE_DATE, '%d/%m/%Y') as CREATE_DATE FROM TRANSACTIONS INNER JOIN CUSTOMERS ON TRANSACTIONS.CUSTOMER_ID = CUSTOMERS.CUSTOMER_ID WHERE TRANSACTIONS.STATUS = 1 AND TRANSACTIONS.CREATE_DATE BETWEEN STR_TO_DATE(:START_DATE, '%d-%m-%Y') AND STR_TO_DATE(:END_DATE, '%d-%m-%Y') GROUP BY TRANSACTIONS.CUSTOMER_ID, TRANSACTIONS.CREATE_DATE ORDER BY TRANSACTIONS.CREATE_DATE DESC "; // GROUP BY TRANSACTIONS.CUSTOMER_ID, TRANSACTIONS.CREATE_DATE 
		logger.debug("sql : " + sql);
		logger.debug("parameter : " + paramMap);
		List<TransactionDate> result = namedParameterJdbcTemplate.query(sql, paramMap, BeanPropertyRowMapper.newInstance(TransactionDate.class));
		logger.info("Transaction result size : " + result.size());
		
		return result;
	}

	@Override
	public List<Transactions> findTransactionByDateAndCustomerId(int customerId, String startDate, String endDate) {
		logger.info("findTransactionByDateAndCustomerId : " + startDate + " , " + endDate + " ,customerId : " + customerId);
		MapSqlParameterSource paramMap = new MapSqlParameterSource();
		paramMap.addValue("CUSTOMER_ID", customerId);
		paramMap.addValue("START_DATE", startDate);
		paramMap.addValue("END_DATE", endDate);

		String sql = "SELECT c.NAME as CUSTOMER_NAME, a.* FROM TRANSACTIONS a LEFT JOIN CUSTOMERS c ON a.CUSTOMER_ID = c.CUSTOMER_ID WHERE a.STATUS = 1 AND a.CUSTOMER_ID = :CUSTOMER_ID AND a.CREATE_DATE BETWEEN STR_TO_DATE(:START_DATE, '%d-%m-%Y') AND STR_TO_DATE(:END_DATE, '%d-%m-%Y') ";
		logger.debug("sql : " + sql);
		logger.debug("parameter : " + paramMap);
		List<Transactions> result = namedParameterJdbcTemplate.query(sql, paramMap, BeanPropertyRowMapper.newInstance(Transactions.class));
		logger.info("Transaction result size : " + result.size());
		return result;
	}

}
