package com.banshare.api.dao;

import com.banshare.api.model.Roles;

public interface RoleDao {

	Roles findByRoleId(int roleId);
}
