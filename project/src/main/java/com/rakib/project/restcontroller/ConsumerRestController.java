package com.rakib.project.restcontroller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rakib.project.entity.Consumer;
import com.rakib.project.entity.User;
import com.rakib.project.service.ConsumerService;
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
@RequestMapping("/api/consumer/")
@CrossOrigin(origins = "http://localhost:4200")
public class ConsumerRestController {

    @Autowired
    private ConsumerService consumerService;

    @Autowired
    private UserService userService;

    @PostMapping("")
    public ResponseEntity<Map<String, String>> registerJobSeeker(
            @RequestPart(value = "user") String userJson,
            @RequestPart(value = "consumer") String consumerJson,
            @RequestParam(value = "photo") MultipartFile file
    ) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        User user = objectMapper.readValue(userJson, User.class);
        Consumer consumer = objectMapper.readValue(consumerJson, Consumer.class);

        try {
            userService.saveOrUpdate(user, file);
            Map<String, String> response = new HashMap<>();
            response.put("Message", "User Added Successfully ");

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("Message", "User Add Failed " + e);
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAll();
        return ResponseEntity.ok(users);

    }


//    @PostMapping("/login")
//    public ResponseEntity<AuthenticationResponse>  login(@RequestBody User request){
//        return ResponseEntity.ok(userService.authencate(request));
//
//    }
//
//
//    @GetMapping("/active/{id}")
//    public ResponseEntity<String> activeUser(@PathVariable("id") int id){
//
//        String response= userService.activeUser(id);
//        return  ResponseEntity.ok(response);
//    }
}