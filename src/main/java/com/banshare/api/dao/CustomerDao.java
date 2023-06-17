package com.banshare.api.dao;

import java.util.List;

import com.banshare.api.model.Customers;

public interface CustomerDao {
	int save(Customers customer);
	int saveAndGetId(Customers customer);

	int update(Customers customer);

	Customers findByCustomerId(int customerId);

	int deleteByCustomerId(int customerId);

	List<Customers> findAll();

	List<Customers> findByStatus(boolean status);
	List<Customers> findByNameContaining(String name);
	List<Customers> findByDescriptionContaining(String description);
	
}
