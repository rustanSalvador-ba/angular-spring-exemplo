package com.backend.spring.repository;


import com.backend.spring.model.Employee;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
    public interface EmployeeRepository extends MongoRepository<Employee, String>{

}