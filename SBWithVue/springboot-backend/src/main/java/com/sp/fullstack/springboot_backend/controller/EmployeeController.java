package com.sp.fullstack.springboot_backend.controller;

import com.sp.fullstack.springboot_backend.dto.EmployeeResponse;
import com.sp.fullstack.springboot_backend.model.Employee;
import com.sp.fullstack.springboot_backend.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin("http://localhost:8082")
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void addEmployee(){

    }
    @GetMapping("/employees")
    @ResponseStatus(HttpStatus.OK)
    public List<EmployeeResponse> getEmployees(){
        return employeeService.getAllEmployees();
    }

}
