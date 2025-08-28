package com.rakib.project.restcontroller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rakib.project.entity.Consumer;
import com.rakib.project.entity.Employee;
import com.rakib.project.entity.User;
import com.rakib.project.repository.IEmployeeRepo;
import com.rakib.project.repository.IUserRepo;
import com.rakib.project.service.AuthService;
import com.rakib.project.service.ConsumerService;
import com.rakib.project.service.EmployeeService;
import com.rakib.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/employee/")
public class EmployeeRestController {


    @Autowired
    private AuthService userService;

    @Autowired
    private IEmployeeRepo employeeRepoRepository;

    @Autowired
    private IUserRepo userRepo;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private AuthService authService;

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
            authService.registerEmployee(user, file, employee);
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



    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {
        System.out.println("Authenticated User: " + authentication.getName());
        System.out.println("Authorities: " + authentication.getAuthorities());
        String email = authentication.getName();
        Optional<User> user =userRepo.findByEmail(email);
        Employee employee = employeeService.getProfileByUserId(user.get().getId());
        return ResponseEntity.ok(employee);

    }




}