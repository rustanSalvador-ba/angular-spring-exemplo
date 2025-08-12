package com.backend.spring.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.backend.spring.model.Employee;

@Repository
//public interface EmployeeRepository extends JpaRepository<Employee, Long>{
    public interface EmployeeRepository extends MongoRepository<Employee, String>{

}