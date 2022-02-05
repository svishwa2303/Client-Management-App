package net.javaguides.springboot.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "clientDetails")
public class Employee {
	
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "date")
	private String date;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "advance")
	private double advance;
	
	@Column(name = "curent_time")
	private String currentTime;
	
	@Column(name = "total_time")
	private double totalTime;
	
	@Column(name = "total_rate")
	private double totalRate;
	
	@Column(name = "balance")
	private double balance;
	
	public Employee()
	{
		
	}
	public Employee(String name, String date, double advance,String currentTime, double totalTime, double totalRate,double balance) {
		super();
		this.name = name;
		this.date = date;
		this.advance = advance;
		this.currentTime = currentTime;
		this.totalTime = totalTime;
		this.totalRate = totalRate;
		this.balance = balance;
		
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public double getAdvance() {
		return advance;
	}
	public void setAdvance(double advance) {
		this.advance = advance;
	}
	public String getCurrentTime() {
		return currentTime;
	}
	public void setCurrentTime(String currentTime) {
		this.currentTime = currentTime;
	}
	public double getTotalTime() {
		return totalTime;
	}
	public void setTotalTime(double totalTime) {
		this.totalTime = totalTime;
	}
	public double getTotalRate() {
		return totalRate;
	}
	public void setTotalRate(double totalRate) {
		this.totalRate = totalRate;
	}
	public double getBalance() {
		return balance;
	}
	public void setBalance(double balance) {
		this.balance = balance;
	}
	
}
