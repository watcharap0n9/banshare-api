package com.banshare.api.model;

import java.math.BigDecimal;
import java.util.Date;

public class TransactionInstallment {
	private int installmentId;
	private int transactionId; // รหัสธุรกรรม
	private int installmentNo; // ลำดับ
	private Date dueDate; // วันที่ครบกำหนดชำระ
	private BigDecimal installmentAmt; // ผ่อนเดือนละ
	// ล่วงหน้า
	// รอจ่าย

	public int getInstallmentId() {
		return installmentId;
	}

	public void setInstallmentId(int installmentId) {
		this.installmentId = installmentId;
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

	public Date getDueDate() {
		return dueDate;
	}

	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
	}

	public BigDecimal getInstallmentAmt() {
		return installmentAmt;
	}

	public void setInstallmentAmt(BigDecimal installmentAmt) {
		this.installmentAmt = installmentAmt;
	}

	@Override
	public String toString() {
		return "TransactionInstallment [installmentId=" + installmentId + ", transactionId=" + transactionId
				+ ", installmentNo=" + installmentNo + ", dueDate=" + dueDate + ", installmentAmt=" + installmentAmt
				+ "]";
	}

}
