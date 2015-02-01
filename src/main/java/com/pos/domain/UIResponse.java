package com.pos.domain;

import java.util.List;

public class UIResponse {

	private boolean success;    
    private String message;
    
    private List<?> list;

    public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	/**
     * @return the list
     */
    public List<?> getList() {
        return list;
    }

    /**
     * @param list the list to set
     */
    public void setList(List<?> list) {
        this.list = list;
    }
    
}
