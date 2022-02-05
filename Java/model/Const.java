package net.javaguides.springboot.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "constTable")
public class Const {
	
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "amount")
	private String amount;
	
	public Const() {
		
	}
	
public Const(String amount) {
	super();
	this.amount = amount;
	}

public long getId() {
	return id;
}

public void setId(long id) {
	this.id = id;
}

public String getAmount() {
	return amount;
}

public void setAmount(String amount) {
	this.amount = amount;
}



}
