package net.javaguides.springboot.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.Const;
import net.javaguides.springboot.model.Employee;
import net.javaguides.springboot.repository.ConstRepository;
import net.javaguides.springboot.repository.EmployeeRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Autowired
	private ConstRepository constRepository;
	
	@GetMapping("/employees")
	public List<Employee> getAllEmployees()
	{
		
		List<Employee> emp= new ArrayList<Employee>();
		
		emp = employeeRepository.findAll();
		
		for(int i=0;i<emp.size();i++)
		{
			System.out.println(emp.get(i).getDate());
		}
		return(employeeRepository.findAll());
	}
	
	// create employee rest api
	@PostMapping("/employees")
	public Employee createEmployee(@RequestBody Employee employee)
	{
		return employeeRepository.save(employee);
	}
	
	// get employee by id rest api
	@GetMapping("/employees/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id)
	{
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id " + id));
		return ResponseEntity.ok(employee);
	}
	
	
	// update employee rest api
	@PutMapping("/employees/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails)
	{
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id " + id));

		employee.setDate(employeeDetails.getDate());
		employee.setName(employeeDetails.getName());
		employee.setAdvance(employeeDetails.getAdvance());
		employee.setCurrentTime(employeeDetails.getCurrentTime());
		employee.setTotalTime(employeeDetails.getTotalTime());
		employee.setTotalRate(employeeDetails.getTotalRate());
		employee.setBalance(employeeDetails.getBalance());
		
		Employee updatedEmployee = 	employeeRepository.save(employee);
		
		return ResponseEntity.ok(updatedEmployee);
	}
	
	// delete employee rest api
	@DeleteMapping("/employees/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id " + id));
		
		employeeRepository.delete(employee);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/const")
	public List<Const> getAllConsts()
	{
		return(constRepository.findAll());
	}
	
	// get const by id rest api
	@GetMapping("/const/{id}")
	public ResponseEntity<Const> getConstById(@PathVariable Long id)
	{
		Const consts = constRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Const not exist with id " + id));
		return ResponseEntity.ok(consts);
	}
	

	// update const rest api
	@PutMapping("/const/{id}")
	public ResponseEntity<Const> updateConstById(@PathVariable Long id, @RequestBody Const constDetails)
	{
		Const consts = constRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Const not exist with id " + id));
		
		consts.setAmount(constDetails.getAmount());
		
		Const updatedConst = 	constRepository.save(consts);
		
		return ResponseEntity.ok(updatedConst);
	}
}
