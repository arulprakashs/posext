package com.pos.domain;

import java.util.List;

import org.apache.commons.lang3.builder.ReflectionToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize
public class CompanyDTO {
	
	@JsonProperty("records")
    private List<Company2> records;
    
	public List<Company2> getRecords() {
		return records;
	}
	public void setRecords(List<Company2> records) {
		this.records = records;
	}
    
	public String toString() {
        return ReflectionToStringBuilder.toString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }
}
