package com.banshare.api.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.banshare.api.dao.RoleDao;
import com.banshare.api.dao.UserDao;
import com.banshare.api.model.Roles;
import com.banshare.api.model.Users;

@Service
public class JwtUserDetailsService implements UserDetailsService {
	
	@Autowired
	UserDao userDao;

	@Autowired
	RoleDao roleDao;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Users user = userDao.findByUsername(username);
		if (user == null) throw new UsernameNotFoundException("User not found with username: " + username);
		
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), getAuthorities(user));
	}
	
	private Set<SimpleGrantedAuthority> getAuthorities(Users user) {
		Set<SimpleGrantedAuthority> authorities = new HashSet<>();
		String roleName = "USER"; // Init role name
		Roles role = roleDao.findByRoleId(user.getRole());
		if (role != null) {
			roleName = role.getRoleName();
		}
		
		authorities.add(new SimpleGrantedAuthority("ROLE_" + roleName)); // Fix single role
		return authorities;
	}
}
