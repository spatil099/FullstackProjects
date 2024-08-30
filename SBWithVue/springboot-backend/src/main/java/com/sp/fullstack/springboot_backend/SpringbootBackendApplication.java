package com.sp.fullstack.springboot_backend;

import com.sp.fullstack.springboot_backend.model.Employee;
import com.sp.fullstack.springboot_backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringbootBackendApplication implements CommandLineRunner{

	public static void main(String[] args) {
		SpringApplication.run(SpringbootBackendApplication.class, args);
	}

	@Autowired
	private EmployeeRepository employeeRepository;

	@Override
	public void run(String... args) throws Exception {
		Employee e1 = Employee.builder()
				.id(1)
				.email("test@gmail.com")
				.firstName("FN")
				.lastName("LN")
				.build();

		Employee e2 = Employee.builder()
				.id(2)
				.email("test1@gmail.com")
				.firstName("FN1")
				.lastName("LN1")
				.build();

		employeeRepository.save(e1);
		employeeRepository.save(e2);
	}
}
