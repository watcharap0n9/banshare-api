package com.banshare.api.payload.request;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class TransactionRequest {
	private int transactionType; // ประเภทธุรกรรม
	private int customerId; // รหัสลูกค้า
	private List<String> customerName = new ArrayList<>(); // รหัสลูกค้า
	private String description; // รายละเอียด
	private int interestType; // 1=รายเดือน/2=รายปี
	private BigDecimal interestRate; // อัตราดอกเบี้ย
	private int paymentType; // 1=รายวัน/2=รายเดือน/3=ระบุ
	private int paymentDate; // รายเดือนทุกวันที่
	private String paymentDateSpecific; // แบบระบุวันที่
	private int daily; // รายวัน
	private String remark; // หมายเหตุ
	private BigDecimal principle; // เงินต้น
	private BigDecimal total; // ยอดรวม
	private int contractPeriod; // จำนวนงวด
	private BigDecimal firstDownAmt; // เงินดาวน์​/หักงวดแรก
	private BigDecimal remaining; // ยอดคงเหลือ
	private BigDecimal installmentAmt; // ผ่อนเดือนละ
	private BigDecimal income; // รายได้
	private String createDate; // วันที่เริ่มผ่อน 09/03/2023 
	private String firstDueDate; // วันที่เริ่มผ่อน 09/03/2023 
	private List<InstallmentRequest> installment = new ArrayList<>();

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

	public List<String> getCustomerName() {
		return customerName;
	}

	public void setCustomerName(List<String> customerName) {
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

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
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

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public String getFirstDueDate() {
		return firstDueDate;
	}

	public void setFirstDueDate(String firstDueDate) {
		this.firstDueDate = firstDueDate;
	}

	public List<InstallmentRequest> getInstallment() {
		return installment;
	}

	public void setInstallment(List<InstallmentRequest> installment) {
		this.installment = installment;
	}

	@Override
	public String toString() {
		return "TransactionRequest [transactionType=" + transactionType + ", customerId=" + customerId
				+ ", customerName=" + customerName + ", description=" + description + ", interestType=" + interestType
				+ ", interestRate=" + interestRate + ", paymentType=" + paymentType + ", paymentDate=" + paymentDate
				+ ", paymentDateSpecific=" + paymentDateSpecific + ", daily=" + daily + ", remark=" + remark
				+ ", principle=" + principle + ", total=" + total + ", contractPeriod=" + contractPeriod
				+ ", firstDownAmt=" + firstDownAmt + ", remaining=" + remaining + ", installmentAmt=" + installmentAmt
				+ ", income=" + income + ", firstDueDate=" + firstDueDate + ", installment=" + installment + "]";
	}

}
