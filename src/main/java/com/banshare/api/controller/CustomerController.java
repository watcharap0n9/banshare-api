package com.banshare.api.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.banshare.api.dao.CustomerDao;
import com.banshare.api.model.Customers;
import com.banshare.api.payload.request.CustomerRequest;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class CustomerController {
	private static final Logger logger = LoggerFactory.getLogger(CustomerController.class);

	@Autowired
	CustomerDao customerDao;

	@PostMapping("/customers")
	public ResponseEntity<String> createCustomer(@RequestBody CustomerRequest customer) {
		try {
			logger.info("Create customer with name : " + customer.getName());
			customerDao.save(new Customers(customer.getName(), customer.getDescription()));
			return new ResponseEntity<>("Customer was created successfully.", HttpStatus.CREATED);
		} catch (DuplicateKeyException dke) {
			return new ResponseEntity<>("Duplicate name '" + customer.getName() + "'", HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/customers/{id}")
	public ResponseEntity<Customers> getCustomerByCustomerId(@PathVariable("id") int customerId) {
		logger.info("Get customer with id : " + customerId);
		Customers customer = customerDao.findByCustomerId(customerId);

		if (customer != null) {
			return new ResponseEntity<>(customer, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("/customers/{id}")
	public ResponseEntity<String> updateCustomer(@PathVariable("id") int customerId,
			@RequestBody CustomerRequest customer) {
		logger.info("Update customer with id : " + customerId);
		Customers _customer = customerDao.findByCustomerId(customerId);

		if (_customer != null) {
			_customer.setCustomerId(customerId);
			_customer.setName(customer.getName());
			_customer.setDescription(customer.getDescription());

			customerDao.update(_customer);
			return new ResponseEntity<>("Customer was updated successfully.", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("Cannot find Customer with customerId=" + customerId, HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/customers/{id}")
	public ResponseEntity<String> deleteCustomer(@PathVariable("id") int customerId) {
		logger.info("Delete customer with id : " + customerId);
		try {
			int result = customerDao.deleteByCustomerId(customerId);
			if (result == 0) {
				return new ResponseEntity<>("Cannot find Customer with customerId=" + customerId, HttpStatus.OK);
			}
			return new ResponseEntity<>("Customer was deleted successfully.", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Cannot delete customer.", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/customers")
	public ResponseEntity<List<Customers>> getAllCustomers(@RequestParam(required = false, name = "name") String name) {
		logger.info("Get AllCustomers");
		try {
			List<Customers> customers = new ArrayList<Customers>();

			if (name == null)
				customerDao.findAll().forEach(customers::add);
			else
				customerDao.findByNameContaining(name).forEach(customers::add);

			if (customers.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(customers, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
