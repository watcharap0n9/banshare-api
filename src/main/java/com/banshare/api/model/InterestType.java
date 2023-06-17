package com.banshare.api.model;

public class InterestType {
	private int interestTypeId;
	private String interestTypeDesc;
	private String color;
	private int seqNo;

	public int getInterestTypeId() {
		return interestTypeId;
	}

	public void setInterestTypeId(int interestTypeId) {
		this.interestTypeId = interestTypeId;
	}

	public String getInterestTypeDesc() {
		return interestTypeDesc;
	}

	public void setInterestTypeDesc(String interestTypeDesc) {
		this.interestTypeDesc = interestTypeDesc;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public int getSeqNo() {
		return seqNo;
	}

	public void setSeqNo(int seqNo) {
		this.seqNo = seqNo;
	}

}
