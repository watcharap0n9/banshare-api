package com.banshare.api.model;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonProperty;

public class TransactionInstallment {
	private int installmentId;
	private int customerId;
	private String customerName;
	private int transactionId; // รหัสธุรกรรม
	private int installmentNo; // ลำดับ
	private String dueDate; // วันที่ครบกำหนดชำระ
	private BigDecimal installmentAmt; // ผ่อนเดือนละ

	@JsonProperty("isPrepaid")
	private boolean isPrepaid;
	// ล่วงหน้า
	// รอจ่าย

	public int getInstallmentId() {
		return installmentId;
	}

	public void setInstallmentId(int installmentId) {
		this.installmentId = installmentId;
	}

	public int getCustomerId() {
		return customerId;
	}

	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public int getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(int transactionId) {
		this.transactionId = transactionId;
	}

	public int getInstallmentNo() {
		return installmentNo;
	}

	public void setInstallmentNo(int installmentNo) {
		this.installmentNo = installmentNo;
	}

	public String getDueDate() {
		if (dueDate != null) {
			String date[] = dueDate.split("-");
			return date[2] + "/" + date[1] + "/" + date[0];
		}
		return dueDate;
	}

	public void setDueDate(String dueDate) {
		this.dueDate = dueDate;
	}

	public BigDecimal getInstallmentAmt() {
		return installmentAmt;
	}

	public void setInstallmentAmt(BigDecimal installmentAmt) {
		this.installmentAmt = installmentAmt;
	}

	public boolean getIsPrepaid() {
		return isPrepaid;
	}

	public void setIsPrepaid(boolean isPrepaid) {
		this.isPrepaid = isPrepaid;
	}

}
