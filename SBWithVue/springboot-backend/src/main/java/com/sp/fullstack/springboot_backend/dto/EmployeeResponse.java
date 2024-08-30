package com.sp.fullstack.springboot_backend.dto;

import jakarta.persistence.Column;
import lombok.*;

@Data
@Builder
public class EmployeeResponse {

    private long id;
    private String firstName;
    private String lastName;
    private String email;
}
