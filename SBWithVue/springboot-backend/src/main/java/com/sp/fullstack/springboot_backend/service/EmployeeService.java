package com.sp.fullstack.springboot_backend.service;

import com.sp.fullstack.springboot_backend.dto.EmployeeResponse;
import com.sp.fullstack.springboot_backend.model.Employee;
import com.sp.fullstack.springboot_backend.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class EmployeeService {

    private EmployeeRepository employeeRepository;
    public List<EmployeeResponse> getAllEmployees() {
        return employeeRepository.findAll().stream().map(this::mapEmployeesToDTO).toList();
    }

    private EmployeeResponse mapEmployeesToDTO(Employee employee) {
        return EmployeeResponse.builder()
                .id(employee.getId())
                .email(employee.getEmail())
                .firstName(employee.getFirstName())
                .lastName(employee.getLastName()).build();
    }
}
