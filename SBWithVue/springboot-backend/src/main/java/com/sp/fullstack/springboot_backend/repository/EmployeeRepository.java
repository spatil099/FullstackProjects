package com.sp.fullstack.springboot_backend.repository;

import com.sp.fullstack.springboot_backend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
