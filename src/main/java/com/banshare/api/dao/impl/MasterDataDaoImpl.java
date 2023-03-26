package com.banshare.api.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.banshare.api.dao.MasterDataDao;
import com.banshare.api.model.InterestType;
import com.banshare.api.model.PaymentType;
import com.banshare.api.model.TransactionType;

@Repository
public class MasterDataDaoImpl implements MasterDataDao {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Override
	public List<InterestType> getAllInterestType() {
		return jdbcTemplate.query("SELECT * FROM INTEREST_TYPE WHERE STATUS=1 ORDER BY SEQ_NO asc", BeanPropertyRowMapper.newInstance(InterestType.class));
	}

	@Override
	public List<PaymentType> getAllPaymentType() {
		return jdbcTemplate.query("SELECT * FROM PAYMENT_TYPE WHERE STATUS=1 ORDER BY SEQ_NO asc", BeanPropertyRowMapper.newInstance(PaymentType.class));
	}

	@Override
	public List<TransactionType> getAllTransactionType() {
		return jdbcTemplate.query("SELECT * FROM TRANSACTION_TYPE WHERE STATUS=1 ORDER BY SEQ_NO asc", BeanPropertyRowMapper.newInstance(TransactionType.class));
	}

}
