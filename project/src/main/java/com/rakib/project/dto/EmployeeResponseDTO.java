package com.rakib.project.dto;

import com.rakib.project.entity.Employee;

import java.util.Date;

public class EmployeeResponseDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String gender;
    private String address;
    private Date dateOfBirth;
    private String photo;

    // Constructor
//    public employeeDTO (Employee employee) {
//        this.id = employee.getId();
//        this.name = employee.getName();
//        this.email = employee.getEmail();
//        this.gender = employee.getGender();
//          this.photo = employee.getPhoto();
//    }
}
