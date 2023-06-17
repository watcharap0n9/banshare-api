package com.banshare.api.payload.response;

public class GenericResponse {
	private int statusCode = 200;
	private String message = "success";

	public GenericResponse() {
		super();
	}

	public GenericResponse(int statusCode, String message) {
		super();
		this.statusCode = statusCode;
		this.message = message;
	}
	

	public GenericResponse(String message) {
		super();
		this.statusCode = 500;
		this.message = message;
	}

	public int getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
