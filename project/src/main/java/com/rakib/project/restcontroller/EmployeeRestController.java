package com.rakib.project.restcontroller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rakib.project.entity.Consumer;
import com.rakib.project.entity.Employee;
import com.rakib.project.entity.User;
import com.rakib.project.service.ConsumerService;
import com.rakib.project.service.EmployeeService;
import com.rakib.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/employee/")
public class EmployeeRestController {



    @Autowired
    private UserService userService;

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("")
    public ResponseEntity<Map<String, String>> registerEmployee(
            @RequestPart(value = "user") String userJson,
            @RequestPart(value = "employee") String employeeJson,
            @RequestParam(value = "photo") MultipartFile file
    ) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        User user = objectMapper.readValue(userJson, User.class);
        Employee employee = objectMapper.readValue(employeeJson, Employee.class);

        try {
            userService.registerConsumer(user, file,employee);
            Map<String, String> response = new HashMap<>();
            response.put("Message", "User Added Successfully ");

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("Message", "User Add Faild " + e);
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }


    @GetMapping("all")
    public ResponseEntity<List<Employee>> getAllUsers() {
        List<Employee> employeeList = employeeService.getAll();
        return ResponseEntity.ok(employeeList);

    }


}
