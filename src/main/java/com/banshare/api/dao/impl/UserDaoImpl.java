package com.banshare.api.dao.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.banshare.api.dao.UserDao;
import com.banshare.api.model.Users;

@Repository
public class UserDaoImpl implements UserDao {
	private static final Logger logger = LoggerFactory.getLogger(UserDaoImpl.class);

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Override
	public int save(Users user) {
		logger.info("Create user : " + user.getUsername() + " with password : ********");
		return jdbcTemplate.update("INSERT INTO USERS (USERNAME, PASSWORD, ROLE) VALUES(?,?,?)",
		        new Object[] { user.getUsername(), user.getPassword(), user.getRole() });
	}

	@Override
	public int update(Users user) {
		return jdbcTemplate.update("UPDATE USERS SET PASSWORD=?, ROLE=? WHERE USER_ID=?",
		        new Object[] { user.getPassword(), user.getRole(), user.getUserId() });
	}

	@Override
	public Users findByUserId(int userId) {
		try {
			Users user = jdbcTemplate.queryForObject("SELECT * FROM USERS WHERE STATUS=1 AND USER_ID=?",
		          BeanPropertyRowMapper.newInstance(Users.class), userId);

		      return user;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	}

	@Override
	public Users findByUsername(String username) {
		try {
			Users user = jdbcTemplate.queryForObject("SELECT * FROM USERS WHERE STATUS=1 AND USERNAME=?",
		          BeanPropertyRowMapper.newInstance(Users.class), username);

		      return user;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	}

	@Override
	public int deleteByUserId(int userId) {
		return jdbcTemplate.update("UPDATE USERS SET STATUS=0 WHERE USER_ID=?",
		        new Object[] { userId });
	}

}
