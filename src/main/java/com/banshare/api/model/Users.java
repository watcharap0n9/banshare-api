package com.banshare.api.model;

public class Users {
	private int userId;
	private String username;
	private String password;
	private int role;

	
	public Users() {
		super();
	}
	
	public Users(String username, String password, int role) {
		super();
		this.username = username;
		this.password = password;
		this.role = role;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getRole() {
		return role;
	}

	public void setRole(int role) {
		this.role = role;
	}

	@Override
	public String toString() {
		return "Users [userId=" + userId + ", username=" + username + ", password=********, role=" + role + "]";
	}

}
