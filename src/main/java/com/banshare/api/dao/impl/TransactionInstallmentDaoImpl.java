package com.banshare.api.dao.impl;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.util.StopWatch;

import com.banshare.api.dao.TransactionInstallmentDao;
import com.banshare.api.model.InstallmentDueDate;
import com.banshare.api.model.TransactionInstallment;

@Repository
public class TransactionInstallmentDaoImpl implements TransactionInstallmentDao {
	private static final Logger logger = LoggerFactory.getLogger(TransactionInstallmentDaoImpl.class);

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Autowired
	private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

	private final String SQL_INSERT = "INSERT INTO TRANSACTION_INSTALLMENT (TRANSACTION_ID, INSTALLMENT_NO, DUE_DATE, INSTALLMENT_AMT) "
									+ "VALUES (:TRANSACTION_ID, :INSTALLMENT_NO, :DUE_DATE, :INSTALLMENT_AMT)";
	private final String SQL_DELETE_TRANSACTION_INSATLLMENT = "UPDATE TRANSACTION_INSTALLMENT SET STATUS=0 WHERE TRANSACTION_ID = :TRANSACTION_ID";
	private final String SQL_FIND_BY_TRANSACTION_ID = "SELECT b.CUSTOMER_ID,c.NAME CUSTOMER_NAME,a.* FROM TRANSACTION_INSTALLMENT a LEFT JOIN TRANSACTIONS b on a.TRANSACTION_ID = b.TRANSACTION_ID INNER JOIN CUSTOMERS c on b.CUSTOMER_ID = c.CUSTOMER_ID WHERE a.STATUS=1 AND a. TRANSACTION_ID=?";
	private final String SQL_FIND_DUE_DATE_TODAY = "SELECT TRANSACTIONS.CUSTOMER_ID, MAX(CUSTOMERS.NAME) as CUSTOMER_NAME, SUM(TRANSACTION_INSTALLMENT.INSTALLMENT_AMT) as SUM_AMT, DATE_FORMAT(TRANSACTION_INSTALLMENT.DUE_DATE, '%d/%m/%Y') as DUE_DATE FROM TRANSACTIONS INNER JOIN TRANSACTION_INSTALLMENT ON TRANSACTIONS.TRANSACTION_ID = TRANSACTION_INSTALLMENT.TRANSACTION_ID INNER JOIN CUSTOMERS ON TRANSACTIONS.CUSTOMER_ID = CUSTOMERS.CUSTOMER_ID WHERE TRANSACTIONS.STATUS = 1 AND TRANSACTIONS.IS_CLOSED = 0 AND TRANSACTION_INSTALLMENT.IS_PREPAID = 0 AND DATE_FORMAT(TRANSACTION_INSTALLMENT.DUE_DATE, '%d%m%Y') = DATE_FORMAT(NOW(), '%d%m%Y') GROUP BY TRANSACTIONS.CUSTOMER_ID, TRANSACTION_INSTALLMENT.DUE_DATE"; // findDueDateToday
	private final String SQL_FIND_DUE_DATE_BY_DATE = "SELECT TRANSACTIONS.CUSTOMER_ID, MAX(CUSTOMERS.NAME) as CUSTOMER_NAME, SUM(TRANSACTION_INSTALLMENT.INSTALLMENT_AMT) as SUM_AMT, DATE_FORMAT(TRANSACTION_INSTALLMENT.DUE_DATE, '%d/%m/%Y') as DUE_DATE FROM TRANSACTIONS INNER JOIN TRANSACTION_INSTALLMENT ON TRANSACTIONS.TRANSACTION_ID = TRANSACTION_INSTALLMENT.TRANSACTION_ID INNER JOIN CUSTOMERS ON TRANSACTIONS.CUSTOMER_ID = CUSTOMERS.CUSTOMER_ID WHERE TRANSACTIONS.STATUS = 1 AND TRANSACTIONS.IS_CLOSED = 0 AND TRANSACTION_INSTALLMENT.IS_PREPAID = 0 AND DATE_FORMAT(TRANSACTION_INSTALLMENT.DUE_DATE, '%d%m%Y') = DATE_FORMAT(STR_TO_DATE(?, '%d-%m-%Y'), '%d%m%Y') GROUP BY TRANSACTIONS.CUSTOMER_ID, TRANSACTION_INSTALLMENT.DUE_DATE;"; // findDueDateToday
	
	@Override
	public int save(TransactionInstallment installment) {
		SqlParameterSource parameters = new MapSqlParameterSource()
				.addValue("TRANSACTION_ID", installment.getTransactionId())
				.addValue("INSTALLMENT_NO", installment.getInstallmentNo())
				.addValue("DUE_DATE", installment.getDueDate())
				.addValue("INSTALLMENT_AMT", installment.getInstallmentAmt());

		KeyHolder holder = new GeneratedKeyHolder();
		int result = namedParameterJdbcTemplate.update(SQL_INSERT, parameters, holder);
		logger.info("Save TransactionInstallment result : " + result);

		return holder.getKey().intValue();
	}

	@Override
	public int batchInsert(List<TransactionInstallment> installments) {
		StopWatch timer = new StopWatch();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd", Locale.US);

		String sql = "INSERT INTO TRANSACTION_INSTALLMENT (TRANSACTION_ID, INSTALLMENT_NO, DUE_DATE, INSTALLMENT_AMT, IS_PREPAID) VALUES (?, ?, ?, ?, ?)";
	    timer.start(); 
	    int[] result = jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

			@Override
			public void setValues(PreparedStatement ps, int i) throws SQLException {
				TransactionInstallment transactionInstallment = installments.get(i);
				ps.setInt(1, transactionInstallment.getTransactionId());
				ps.setInt(2, transactionInstallment.getInstallmentNo());
				try {
					ps.setDate(3, new java.sql.Date(formatter.parse(transactionInstallment.getDueDate()).getTime()));
				} catch (SQLException | ParseException e) {
					e.printStackTrace();
				}
				ps.setBigDecimal(4, transactionInstallment.getInstallmentAmt());
				ps.setBoolean(5, transactionInstallment.getIsPrepaid());
				
			}

			@Override
			public int getBatchSize() {
				return installments.size();
			}
	    	
	    });
	    timer.stop();
	    logger.info("batchInsert -> Total time in seconds: " + timer.getTotalTimeSeconds());
	    logger.info("batchInsert -> Total result: " + result.length);
		return result.length;
	}

	@Override
	public int update(TransactionInstallment installment) {
		return 0;
	}

	@Override
	public int delete(int transactionId) {
		SqlParameterSource parameters = new MapSqlParameterSource().addValue("TRANSACTION_ID", transactionId);

		int result = namedParameterJdbcTemplate.update(SQL_DELETE_TRANSACTION_INSATLLMENT, parameters);
		logger.info("Delete installment TRANSACTION_ID : " + transactionId + " , result = " + result);
		return result;
	}

	@Override
	public List<TransactionInstallment> findByTransactionId(int transactionId) {
		return jdbcTemplate.query(SQL_FIND_BY_TRANSACTION_ID, BeanPropertyRowMapper.newInstance(TransactionInstallment.class), transactionId);
	}

	@Override
	public List<InstallmentDueDate> findDueDateToday2() {
		return jdbcTemplate.query(SQL_FIND_DUE_DATE_TODAY, BeanPropertyRowMapper.newInstance(InstallmentDueDate.class));
	}

	@Override
	public List<InstallmentDueDate> findDueDateByDate(String date) {
		List<String> tmp = new ArrayList<>();
		tmp.add(date);
		logger.debug("findDueDateByDate sql : " + SQL_FIND_DUE_DATE_BY_DATE);
		logger.debug("parameter : " + tmp);
		return jdbcTemplate.query(SQL_FIND_DUE_DATE_BY_DATE, BeanPropertyRowMapper.newInstance(InstallmentDueDate.class), new Object[] { date });
	}

	@Override
	public List<TransactionInstallment> findInstallmentByCustomeIdAndDate(int customerId, String date) {
		List<Object> tmp = new ArrayList<>();
		tmp.add(customerId);
		tmp.add(date);
		String sql = "SELECT a.INSTALLMENT_ID, b.CUSTOMER_ID, c.NAME as CUSTOMER_NAME, b.TRANSACTION_ID, a.INSTALLMENT_NO, a.DUE_DATE, a.INSTALLMENT_AMT, a.IS_PREPAID FROM TRANSACTION_INSTALLMENT a LEFT JOIN TRANSACTIONS b on a.TRANSACTION_ID = b.TRANSACTION_ID LEFT JOIN CUSTOMERS c on b.CUSTOMER_ID = c.CUSTOMER_ID WHERE a.STATUS = 1 AND b.STATUS = 1 AND a.IS_PREPAID = 0 AND b.CUSTOMER_ID = ? AND DATE_FORMAT(a.DUE_DATE, '%d%m%Y') = DATE_FORMAT(STR_TO_DATE(?, '%d-%m-%Y'), '%d%m%Y')";
		logger.debug("findInstallmentByCustomeIdAndDate sql : " + sql);
		logger.debug("parameter : " + tmp);
		return jdbcTemplate.query(sql, BeanPropertyRowMapper.newInstance(TransactionInstallment.class), new Object[] { customerId, date });
	}

}
