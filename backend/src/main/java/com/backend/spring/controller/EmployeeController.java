package com.backend.spring.controller;

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

import com.backend.spring.exception.ResourceNotFoundException;
import com.backend.spring.exception.ValidationException;
import com.backend.spring.model.Employee;
import com.backend.spring.repository.EmployeeRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {
	
	Boolean valid;
	Employee aux;
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	// get all employees
	@GetMapping("/employees")
	public List<Employee> getAllEmployees(){
		return employeeRepository.findAll();
	}	
	
	// create employee rest api
	@PostMapping("/employees")
	public Employee createEmployee(@RequestBody Employee employee) throws ValidationException {
		
		if (!existUser(employee)) {
			return employeeRepository.save(employee);
		}
		else {
			throw new ValidationException("Email já cadastrado: " + employee.getEmailId());
		}
	}
	
	// login rest api
		@PostMapping("/employees/login")
		public ResponseEntity<Employee> login(@RequestBody Employee employee) throws ValidationException {
			
			if (this.checkUser(employee)) {
				this.aux = getUserbyEmail(employee);
				this.aux.setStatus(true);
				Employee updatedEmployee = employeeRepository.save(this.aux);
				return ResponseEntity.ok(updatedEmployee);
			}
			else {
				throw new ValidationException("Email ou senha incorretos: " + employee.getEmailId());
			}
		}
		
		// logout rest api
		@PostMapping("/employees/logout/{id}")
		public ResponseEntity<Employee> logout(@PathVariable Long id) throws ValidationException {
			Employee employee = employeeRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Funcionário não existe, id :" + id));
			
			employee.setStatus(false);
			Employee updatedEmployee = employeeRepository.save(employee);
			return ResponseEntity.ok(updatedEmployee);
		}
		
	// get employee by id rest api
	@GetMapping("/employees/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Funcionário não existe, id :" + id));
		return ResponseEntity.ok(employee);
	}
	
	// update employee rest api
	
	@PutMapping("/employees/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails) throws ValidationException{
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Funcionário não existe, id :" + id));
		
		if ( (employee.getEmailId().equals(employeeDetails.getEmailId()) || (!existUser(employeeDetails)))) {
			employee.setFirstName(employeeDetails.getFirstName());
			employee.setLastName(employeeDetails.getLastName());
			employee.setEmailId(employeeDetails.getEmailId());
			
			Employee updatedEmployee = employeeRepository.save(employee);
			return ResponseEntity.ok(updatedEmployee);
		}
		else {
		      throw new ValidationException("Email já cadastrado: " + employeeDetails.getEmailId());
		}
		
		
	}
	
	// update saldo rest api
	
	@PutMapping("/employees/update-saldo/{id}")
	public ResponseEntity<Employee> updateSaldo(@PathVariable Long id, @RequestBody Employee employeeDetails){
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Funcionário não existe, id :" + id));
		employee.setSaldo(employeeDetails.getSaldo());
		
		Employee updatedSaldo = employeeRepository.save(employee);
		return ResponseEntity.ok(updatedSaldo);
	}
	
	
	// delete employee rest api
	@DeleteMapping("/employees/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Funcionário não existe, id :" + id));
		
		employeeRepository.delete(employee);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	public boolean existUser(Employee employee) {
		this.valid = false;
		List<Employee> emploiyees = this.getAllEmployees();
		emploiyees.stream().forEach((emp) -> {
		  if (emp.getEmailId().equals(employee.getEmailId())) {
			  this.valid = true;
		  }
		});
		
		return this.valid;
	}
	
	public boolean checkUser(Employee employee) {
		this.valid = false;
		List<Employee> emploiyees = this.getAllEmployees();
		emploiyees.stream().forEach((emp) -> {
		  if (emp.getEmailId().equals(employee.getEmailId()) && emp.getPassword().equals(employee.getPassword())) {
			  this.valid = true;
		  }
		});
		
		return this.valid;
	}
	
	public Employee getUserbyEmail(Employee employee) {
		List<Employee> emploiyees = this.getAllEmployees();
		emploiyees.stream().forEach((emp) -> {
		  if (emp.getEmailId().equals(employee.getEmailId())) {
			  this.aux = emp;
		  } 
		});
		
		return this.aux;
	}
}