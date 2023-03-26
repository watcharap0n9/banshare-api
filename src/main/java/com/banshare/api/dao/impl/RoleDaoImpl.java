package com.banshare.api.dao.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.banshare.api.dao.RoleDao;
import com.banshare.api.model.Roles;

@Repository
public class RoleDaoImpl implements RoleDao {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Override
	public Roles findByRoleId(int roleId) {
		try {
			Roles role = jdbcTemplate.queryForObject("SELECT * FROM ROLES WHERE ROLE_ID=?",
		          BeanPropertyRowMapper.newInstance(Roles.class), roleId);

		      return role;
	    } catch (IncorrectResultSizeDataAccessException e) {
	      return null;
	    }
	}

}
