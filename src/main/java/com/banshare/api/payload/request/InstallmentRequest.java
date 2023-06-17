package com.banshare.api.payload.request;

import java.math.BigDecimal;

public class InstallmentRequest {
	private int installmentNo; // ลำดับ
	private String dueDate; // วันที่ครบกำหนดชำระ
	private BigDecimal installmentAmt; // ผ่อนเดือนละ

	public int getInstallmentNo() {
		return installmentNo;
	}

	public void setInstallmentNo(int installmentNo) {
		this.installmentNo = installmentNo;
	}

	public String getDueDate() {
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

	@Override
	public String toString() {
		return "InstallmentRequest [installmentNo=" + installmentNo + ", dueDate=" + dueDate + ", installmentAmt="
				+ installmentAmt + "]";
	}

}
