package com.banshare.api.dao;

import com.banshare.api.model.Users;

public interface UserDao {
	int save(Users user);
	int update(Users user);
	Users findByUserId(int userId);
	Users findByUsername(String username);
	int deleteByUserId(int userId);
}
