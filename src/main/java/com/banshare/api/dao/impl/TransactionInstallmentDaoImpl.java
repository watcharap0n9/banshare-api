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

import com.banshare.api.dao.TransactionInstallmentDao;
import com.banshare.api.model.TransactionInstallment;

@Repository
public class TransactionInstallmentDaoImpl implements TransactionInstallmentDao {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Autowired
	private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

	private final String SQL_INSERT = "INSERT INTO TRANSACTION_INSTALLMENT (TRANSACTION_ID, INSTALLMENT_NO, DUE_DATE, INSTALLMENT_AMT) "
									+ "VALUES (:TRANSACTION_ID, :INSTALLMENT_NO, :DUE_DATE, :INSTALLMENT_AMT)";
	private final String SQL_DELETE_TRANSACTION_INSATLLMENT = "UPDATE TRANSACTION_INSTALLMENT SET STATUS=0 WHERE TRANSACTION_ID = :TRANSACTION_ID";
	private final String SQL_FIND_BY_TRANSACTION_ID = "SELECT * FROM TRANSACTION_INSTALLMENT WHERE STATUS=1 AND TRANSACTION_ID=?";
	private final String SQL_FIND_DUE_DATE_TODAY = "SELECT * FROM TRANSACTION_INSTALLMENT WHERE STATUS = 1 AND DATE_FORMAT(DUE_DATE, '%d%m%Y') = DATE_FORMAT(NOW(), '%d%m%Y')"; // findDueDateToday

	@Override
	public int save(TransactionInstallment installment) {
		SqlParameterSource parameters = new MapSqlParameterSource()
				.addValue("TRANSACTION_ID", installment.getTransactionId())
				.addValue("INSTALLMENT_NO", installment.getInstallmentNo())
				.addValue("DUE_DATE", installment.getDueDate())
				.addValue("INSTALLMENT_AMT", installment.getInstallmentAmt());

		KeyHolder holder = new GeneratedKeyHolder();
		int result = namedParameterJdbcTemplate.update(SQL_INSERT, parameters, holder);
		System.out.println("Save TransactionInstallment result : " + result);

		return holder.getKey().intValue();
	}

	@Override
	public int update(TransactionInstallment installment) {
		return 0;
	}

	@Override
	public int delete(int transactionId) {
		SqlParameterSource parameters = new MapSqlParameterSource().addValue("TRANSACTION_ID", transactionId);

		int result = namedParameterJdbcTemplate.update(SQL_DELETE_TRANSACTION_INSATLLMENT, parameters);
		System.out.println("Delete installment TRANSACTION_ID : " + transactionId + " , result = " + result);
		return result;
	}

	@Override
	public List<TransactionInstallment> findByTransactionId(int transactionId) {
		return jdbcTemplate.query(SQL_FIND_BY_TRANSACTION_ID, BeanPropertyRowMapper.newInstance(TransactionInstallment.class), transactionId);
	}

	@Override
	public List<TransactionInstallment> findDueDateToday() {
		return jdbcTemplate.query(SQL_FIND_DUE_DATE_TODAY, BeanPropertyRowMapper.newInstance(TransactionInstallment.class));
	}

}
