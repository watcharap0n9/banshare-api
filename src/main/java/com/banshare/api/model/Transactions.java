package com.banshare.api.model;

import java.math.BigDecimal;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Transactions {
	private int transactionId; // รหัสธุรกรรม
	private int transactionType; // ประเภทธุรกรรม
	private int customerId; // รหัสลูกค้า
	private String customerName; // รายละเอียด
	private String description; // รายละเอียด
	private int interestType; // รายเดือน/รายปี
	private BigDecimal interestRate; // อัตราดอกเบี้ย
	private int paymentType; // รายวัน/รายเดือน
	private int paymentDate; // รายเดือนทุกวันที่ 
	private String paymentDateSpecific; // แบบระบุวันที่

	@JsonProperty("daily")
	private int daily; // รายวัน
	
	@JsonProperty("isClosed")
	private boolean isClosed; // ปิดแล้ว

	private String deposit; // ฝาก
	private String remark; // หมายเหตุ
	private BigDecimal principle; // เงินต้น
	private BigDecimal total; // ยอดรวม
	private int contractPeriod; // จำนวนงวด
	private BigDecimal firstDownAmt; // เงินดาวน์​/หักงวดแรก
	private BigDecimal remaining; // ยอดคงเหลือ
	private BigDecimal installmentAmt; // ผ่อนเดือนละ
	private BigDecimal income; // รายได้
	private Date contractFirstDueDate; // วันที่เริ่มผ่อน
	private Date contractEndDate; // งวดสุดท้าย
	private Date createDate; // วันที่ทำรายการ

	public int getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(int transactionId) {
		this.transactionId = transactionId;
	}

	public int getTransactionType() {
		return transactionType;
	}

	public void setTransactionType(int transactionType) {
		this.transactionType = transactionType;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getInterestType() {
		return interestType;
	}

	public void setInterestType(int interestType) {
		this.interestType = interestType;
	}

	public BigDecimal getInterestRate() {
		return interestRate;
	}

	public void setInterestRate(BigDecimal interestRate) {
		this.interestRate = interestRate;
	}

	public int getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(int paymentType) {
		this.paymentType = paymentType;
	}

	public int getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(int paymentDate) {
		this.paymentDate = paymentDate;
	}

	public String getPaymentDateSpecific() {
		return paymentDateSpecific;
	}

	public void setPaymentDateSpecific(String paymentDateSpecific) {
		this.paymentDateSpecific = paymentDateSpecific;
	}

	public int getDaily() {
		return daily;
	}

	public void setDaily(int daily) {
		this.daily = daily;
	}

	public boolean getIsClosed() {
		return isClosed;
	}

	public void setIsClosed(boolean isClosed) {
		this.isClosed = isClosed;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getDeposit() {
		return deposit;
	}

	public void setDeposit(String deposit) {
		this.deposit = deposit;
	}

	public BigDecimal getPrinciple() {
		return principle;
	}

	public void setPrinciple(BigDecimal principle) {
		this.principle = principle;
	}

	public BigDecimal getTotal() {
		return total;
	}

	public void setTotal(BigDecimal total) {
		this.total = total;
	}

	public int getContractPeriod() {
		return contractPeriod;
	}

	public void setContractPeriod(int contractPeriod) {
		this.contractPeriod = contractPeriod;
	}

	public BigDecimal getFirstDownAmt() {
		return firstDownAmt;
	}

	public void setFirstDownAmt(BigDecimal firstDownAmt) {
		this.firstDownAmt = firstDownAmt;
	}

	public BigDecimal getRemaining() {
		return remaining;
	}

	public void setRemaining(BigDecimal remaining) {
		this.remaining = remaining;
	}

	public BigDecimal getInstallmentAmt() {
		return installmentAmt;
	}

	public void setInstallmentAmt(BigDecimal installmentAmt) {
		this.installmentAmt = installmentAmt;
	}

	public BigDecimal getIncome() {
		return income;
	}

	public void setIncome(BigDecimal income) {
		this.income = income;
	}

	public Date getContractFirstDueDate() {
		return contractFirstDueDate;
	}

	public void setContractFirstDueDate(Date contractFirstDueDate) {
		this.contractFirstDueDate = contractFirstDueDate;
	}

	public Date getContractEndDate() {
		return contractEndDate;
	}

	public void setContractEndDate(Date contractEndDate) {
		this.contractEndDate = contractEndDate;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	@Override
	public String toString() {
		return "Transactions [transactionId=" + transactionId + ", transactionType=" + transactionType + ", customerId="
				+ customerId + ", description=" + description + ", interestType=" + interestType + ", interestRate="
				+ interestRate + ", paymentType=" + paymentType + ", paymentDate=" + paymentDate + ", daily=" + daily
				+ ", isClosed=" + isClosed + ", remark=" + remark + ", principle=" + principle + ", total=" + total
				+ ", contractPeriod=" + contractPeriod + ", firstDownAmt=" + firstDownAmt + ", remaining=" + remaining
				+ ", installmentAmt=" + installmentAmt + ", income=" + income + ", contractFirstDueDate="
				+ contractFirstDueDate + ", contractEndDate=" + contractEndDate + ", createDate=" + createDate + "]";
	}

}
