package com.banshare.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.banshare.api.model.TransactionInstallment;
import com.banshare.api.model.Transactions;
import com.banshare.api.payload.request.TransactionRequest;
import com.banshare.api.service.TransactionService;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class TransactionController {
	
	@Autowired
	TransactionService transactionService;

	@PostMapping("/transactions")
	public ResponseEntity<String> createTransaction(@RequestBody TransactionRequest transaction) {
		try {
			System.out.println(transaction);
			int transactionId = transactionService.createTransaction(transaction);
			return new ResponseEntity<>("Transaction was created successfully with id: " + transactionId, HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/transactions/{id}")
	public ResponseEntity<Transactions> findByTransactionId(@PathVariable("id") int id) {
		Transactions listInstallment = transactionService.findByTransactionId(id);

		if (listInstallment != null) {
			return new ResponseEntity<>(listInstallment, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/transactions")
	public ResponseEntity<List<Transactions>> getAllTransaction() {
		List<Transactions> listAllTransaction = transactionService.findAllTransaction();

		if (listAllTransaction != null) {
			return new ResponseEntity<>(listAllTransaction, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("/transactions/{id}")
	public ResponseEntity<String> deleteByTransactionById(@PathVariable("id") int id) {
		try {
			int result = transactionService.deleteTransactionByTransactionId(id);
			if (result == 0) {
				return new ResponseEntity<>("Cannot find Transaction with transactionId=" + id, HttpStatus.OK);
			}
			return new ResponseEntity<>("Transaction was deleted successfully.", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Cannot delete transaction.", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/installments/{id}")
	public ResponseEntity<List<TransactionInstallment>> getInstallmentByTransactionId(@PathVariable("id") int id) {
		List<TransactionInstallment> listInstallment = transactionService.findInstallmentByTransactionId(id);

		if (listInstallment != null) {
			return new ResponseEntity<>(listInstallment, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/installments/today")
	public ResponseEntity<List<TransactionInstallment>> getInstallmentDueDateToday() {
		List<TransactionInstallment> listInstallmentDueDateToday = transactionService.findDueDateToday();

		if (listInstallmentDueDateToday != null) {
			return new ResponseEntity<>(listInstallmentDueDateToday, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
