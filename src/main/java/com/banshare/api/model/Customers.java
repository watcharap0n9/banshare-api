package com.banshare.api.model;

public class Customers {
	private int customerId;
	private String name;
	private String description;


	public Customers() {
		super();
	}

	public Customers(String name, String description) {
		super();
		this.name = name;
		this.description = description;
	}

	public Customers(int customerId, String name, String description) {
		super();
		this.customerId = customerId;
		this.name = name;
		this.description = description;
	}

	public int getCustomerId() {
		return customerId;
	}

	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
