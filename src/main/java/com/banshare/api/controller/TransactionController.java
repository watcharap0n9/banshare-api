package com.banshare.api.controller;

import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.banshare.api.model.InstallmentDueDate;
import com.banshare.api.model.TransactionDate;
import com.banshare.api.model.TransactionInstallment;
import com.banshare.api.model.Transactions;
import com.banshare.api.payload.request.TransactionRequest;
import com.banshare.api.payload.response.GenericResponse;
import com.banshare.api.service.TransactionService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class TransactionController {
	private static final Logger logger = LoggerFactory.getLogger(TransactionController.class);
	ObjectMapper mapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);;
	
	@Autowired
	TransactionService transactionService;

	@PostMapping("/transactions")
	public ResponseEntity<GenericResponse> createTransaction(@RequestBody TransactionRequest transaction) throws JsonProcessingException {
		logger.info("Request create transaction : " + mapper.writeValueAsString(transaction));
		if (3 == transaction.getPaymentType() && StringUtils.isEmpty(transaction.getPaymentDateSpecific())) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
		
		try {
			transactionService.createTransaction(transaction);
			return new ResponseEntity<>(new GenericResponse(), HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(new GenericResponse(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/transactions/{id}")
	public ResponseEntity<Transactions> findByTransactionId(@PathVariable("id") int id) {
		logger.info("Find transaction with id : " + id);
		Transactions listInstallment = transactionService.findByTransactionId(id);
		logger.info("Result : " + listInstallment);

		if (listInstallment != null) {
			return new ResponseEntity<>(listInstallment, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/transactions/search/{startDate}/{endDate}")
	public ResponseEntity<List<TransactionDate>> findByDate(@PathVariable("startDate") String startDate, @PathVariable("endDate") String endDate) {
		logger.info("Find transaction by date : " + startDate + " - " + endDate);
		List<TransactionDate> listInstallment = transactionService.findTransactionByDate(startDate, endDate);
		logger.info("Result : " + listInstallment.size());

		return new ResponseEntity<>(listInstallment, HttpStatus.OK);
	}

	@GetMapping("/transactions/search/{customerId}/{startDate}/{endDate}")
	public ResponseEntity<List<Transactions>> findByDateAndCustomerId(@PathVariable("customerId") int customerId, @PathVariable("startDate") String startDate, @PathVariable("endDate") String endDate) {
		logger.info("Find transaction by date : " + startDate + " - " + endDate);
		logger.info("and customer id : " + customerId);
		List<Transactions> listInstallment = transactionService.findTransactionByDateAndCustomerId(customerId, startDate, endDate);
		logger.info("Result : " + listInstallment.size());

		return new ResponseEntity<>(listInstallment, HttpStatus.OK);
	}

	@PatchMapping("/transactions/{id}")
	public ResponseEntity<Transactions> updateTransaction(@PathVariable("id") int id, @RequestBody TransactionRequest transaction) {
		logger.info("Update transaction id : " + id);
		logger.info("TransactionRequest : " + transaction);
		Transactions listInstallment = transactionService.findByTransactionId(id);
		logger.info("Result : " + listInstallment);

		return new ResponseEntity<>(listInstallment, HttpStatus.OK);
	}

	@PostMapping("/transactions/close/{transactionId}")
	public ResponseEntity<GenericResponse> closeTransaction(@PathVariable("transactionId") int transactionId) {
		logger.info("Close transaction id : " + transactionId);
		int result = transactionService.closeTransactionByTransactionId(transactionId);
		logger.info("Result : " + result);

		if (result == 0) {
			return new ResponseEntity<>(null, HttpStatus.NOT_MODIFIED);
		}
		return new ResponseEntity<>(new GenericResponse(), HttpStatus.OK);
	}

	@PostMapping("/transactions/open/{transactionId}")
	public ResponseEntity<GenericResponse> openTransaction(@PathVariable("transactionId") int transactionId) {
		logger.info("Open transaction id : " + transactionId);
		int result = transactionService.openTransactionByTransactionId(transactionId);
		logger.info("Result : " + result);

		if (result == 0) {
			return new ResponseEntity<>(null, HttpStatus.NOT_MODIFIED);
		}
		return new ResponseEntity<>(new GenericResponse(), HttpStatus.OK);
	}

	@PostMapping("/transactions/prepaid/{transactionId}")
	public ResponseEntity<GenericResponse> prepaidTransaction(@PathVariable("transactionId") int transactionId, @RequestBody Map<String, Object> param) {
		@SuppressWarnings("unchecked")
		List<Integer> installmentId = (List<Integer>) param.get("installmentId");
		logger.info("Request prepaid transaction id : " + transactionId + " ,installment id : " + installmentId);
		if (CollectionUtils.isEmpty(installmentId)) {
			return new ResponseEntity<>(null, HttpStatus.NOT_MODIFIED);
		}
		
		int result = transactionService.prepaidByInstallmentId(transactionId, installmentId);
		logger.info("Result : " + result);

		if (result == 0) {
			return new ResponseEntity<>(null, HttpStatus.NOT_MODIFIED);
		}
		return new ResponseEntity<>(new GenericResponse(), HttpStatus.OK);
	}

	@PostMapping("/transactions/prepaid/{transactionId}/{installmentId}")
	public ResponseEntity<GenericResponse> prepaidTransaction(@PathVariable("transactionId") int transactionId, @PathVariable("installmentId") int installmentId) {
		logger.info("Request prepaid with transactionId : " + transactionId + " , installmentId : " + installmentId);
		int result = transactionService.prepaidTransaction(transactionId, installmentId);
		logger.info("Result : " + result);

		if (result == 0) {
			return new ResponseEntity<>(null, HttpStatus.NOT_MODIFIED);
		}
		return new ResponseEntity<>(new GenericResponse(), HttpStatus.OK);
	}

	@GetMapping("/transactions/{customerId}/{date}")
	public ResponseEntity<List<Transactions>> findByTransactionCustomerIdAndDate(@PathVariable("customerId") int customerId,@PathVariable("date") String date) {
		logger.info("Find transaction with customer id : " + customerId + " ,date : " + date);
		List<Transactions> listTransaction = transactionService.findByTransactionCustomerIdAndDate(customerId, date);
		logger.info("Result : " + listTransaction.size());

		return new ResponseEntity<>(listTransaction, HttpStatus.OK);
	}

	@GetMapping("/transactions/customer/{customerId}")
	public ResponseEntity<List<Transactions>> findByTransactionCustomerId(@PathVariable("customerId") int customerId) {
		logger.info("Find transaction by customer id : " + customerId);
		List<Transactions> listTransaction = transactionService.findByTransactionCustomerId(customerId);
		logger.info("Result : " + listTransaction.size());

		return new ResponseEntity<>(listTransaction, HttpStatus.OK);
	}

	@GetMapping("/transactions")
	public ResponseEntity<List<Transactions>> getAllTransaction() {
		logger.info("Request getAllTransaction ");
		List<Transactions> listAllTransaction = transactionService.findAllTransaction();

		if (listAllTransaction != null) {
			logger.info("Result : " + listAllTransaction.size());
			return new ResponseEntity<>(listAllTransaction, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("/transactions/{id}")
	public ResponseEntity<GenericResponse> deleteByTransactionById(@PathVariable("id") int id) {
		logger.info("Delete transaction by id : " + id);
		try {
			int result = transactionService.deleteTransactionByTransactionId(id);
			if (result == 0) {
				return new ResponseEntity<>(null, HttpStatus.NOT_MODIFIED);
			}
			return new ResponseEntity<>(new GenericResponse(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/installments/{id}")
	public ResponseEntity<List<TransactionInstallment>> getInstallmentByTransactionId(@PathVariable("id") int id) {
		logger.info("Find installments by transaction id : " + id);
		List<TransactionInstallment> listInstallment = transactionService.findInstallmentByTransactionId(id);
		logger.info("Result : " + listInstallment.size());

		return new ResponseEntity<>(listInstallment, HttpStatus.OK);
	}
	
	@GetMapping("/installments/today")
	public ResponseEntity<List<InstallmentDueDate>> getInstallmentDueDateToday() {
		logger.info("Request : get Installment DueDate Today");
		List<InstallmentDueDate> listInstallmentDueDateToday = transactionService.findDueDateToday();
		logger.info("Result : " + listInstallmentDueDateToday.size());

		return new ResponseEntity<>(listInstallmentDueDateToday, HttpStatus.OK);
	}

	@GetMapping("/installments/date/{date}")
	public ResponseEntity<List<InstallmentDueDate>> getInstallmentDueDateByDate(@PathVariable("date") String dates) {
		logger.info("Find installment duedate by date : " + dates);
		List<InstallmentDueDate> listInstallmentDueDateToday = transactionService.findDueDateByDate(dates);
		logger.info("Result : " + listInstallmentDueDateToday.size());

		return new ResponseEntity<>(listInstallmentDueDateToday, HttpStatus.OK);
	}

	@GetMapping("/installments/{customerId}/{date}")
	public ResponseEntity<List<TransactionInstallment>> getInstallmentByCustomeIdAndDate(@PathVariable("customerId") int customerId, @PathVariable("date") String date) {
		logger.info("Find installment by customer id : " + customerId + " ,date : " + date);
		List<TransactionInstallment> listInstallment = transactionService.getInstallmentByCustomeIdAndDate(customerId, date);
		logger.info("Result size : " + listInstallment.size());

		return new ResponseEntity<>(listInstallment, HttpStatus.OK);
	}
}
