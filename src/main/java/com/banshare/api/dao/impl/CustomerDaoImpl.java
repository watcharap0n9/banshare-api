package com.banshare.api.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import com.banshare.api.dao.CustomerDao;
import com.banshare.api.model.Customers;

@Repository
public class CustomerDaoImpl implements CustomerDao {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Autowired
	private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

	@Override
	public int save(Customers customer) {
		return jdbcTemplate.update("INSERT INTO CUSTOMERS (NAME, DESCRIPTION) VALUES(?,?)",
		        new Object[] { customer.getName(), customer.getDescription() });
	}

	@Override
	public int update(Customers customer) {
		return jdbcTemplate.update("UPDATE CUSTOMERS SET NAME=?, DESCRIPTION=? WHERE CUSTOMER_ID=?",
		        new Object[] { customer.getName(), customer.getDescription(), customer.getCustomerId() });
	}

	@Override
	public Customers findByCustomerId(int customerId) {
		try {
			Customers customer = jdbcTemplate.queryForObject("SELECT * FROM CUSTOMERS WHERE STATUS=1 AND CUSTOMER_ID=?",
		          BeanPropertyRowMapper.newInstance(Customers.class), customerId);

		      return customer;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	}

	@Override
	public int deleteByCustomerId(int customerId) {
		return jdbcTemplate.update("UPDATE CUSTOMERS SET STATUS=FALSE WHERE CUSTOMER_ID=?",
		        new Object[] { customerId });
	}

	@Override
	public List<Customers> findAll() {
		return jdbcTemplate.query("SELECT * FROM CUSTOMERS WHERE STATUS=1", BeanPropertyRowMapper.newInstance(Customers.class));
	}

	@Override
	public List<Customers> findByStatus(boolean status) {
		return jdbcTemplate.query("SELECT * FROM CUSTOMERS WHERE STATUS=?", BeanPropertyRowMapper.newInstance(Customers.class), status);
	}

	@Override
	public List<Customers> findByNameContaining(String name) {
		System.out.println("findByNameContaining : " + name);
		MapSqlParameterSource parameters = new MapSqlParameterSource();
		parameters.addValue("name", "%" + name + "%");
		List<Customers> result = namedParameterJdbcTemplate.query("SELECT * FROM CUSTOMERS WHERE STATUS=1 AND NAME LIKE :name", parameters, BeanPropertyRowMapper.newInstance(Customers.class));
		System.out.println("result size : " + result.size());
		return result;
	}

	@Override
	public List<Customers> findByDescriptionContaining(String description) {
		System.out.println("findByDescriptionContaining : " + description);
		MapSqlParameterSource parameters = new MapSqlParameterSource();
		parameters.addValue("description", "%" + description + "%");
		List<Customers> result = namedParameterJdbcTemplate.query("SELECT * FROM CUSTOMERS WHERE STATUS=1 AND DESCRIPTION LIKE :description", parameters, BeanPropertyRowMapper.newInstance(Customers.class));
		System.out.println("result size : " + result.size());
		return result;
	}

}
