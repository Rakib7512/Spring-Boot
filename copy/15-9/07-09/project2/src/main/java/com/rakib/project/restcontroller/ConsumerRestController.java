package com.rakib.project.restcontroller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rakib.project.dto.AuthenticationResponse;
import com.rakib.project.entity.Consumer;
import com.rakib.project.entity.Employee;
import com.rakib.project.entity.User;
import com.rakib.project.repository.IUserRepo;
import com.rakib.project.service.ConsumerService;
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
@RequestMapping("/api/consumer/")

public class ConsumerRestController {

    @Autowired
    private IUserRepo  userRepo;

    @Autowired
    private UserService userService;

    @Autowired
    private ConsumerService consumerService;

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
            userService.registerConsumer(user, file, consumer);
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
    public ResponseEntity<List<Consumer>> getAllUsers() {
        List<Consumer> consumerList = consumerService.getAll();
        return ResponseEntity.ok(consumerList);

    }


    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {
        System.out.println("Authenticated User: " + authentication.getName());
        System.out.println("Authorities: " + authentication.getAuthorities());
        String email = authentication.getName();
        Optional<User> user =userRepo.findByEmail(email);
        Consumer consumer = consumerService.getProfileByUserId(user.get().getId());
        return ResponseEntity.ok(consumer);

    }


    @GetMapping("my-id")
    public ResponseEntity<Long> getLoggedInConsumerId(Authentication authentication) {
        String email = authentication.getName(); // Spring Security sets this to username (your email)
        Long consumerId = consumerService.getConsumerIdByEmail(email);
        System.out.println(consumerId);
        if (consumerId != null) {
            return ResponseEntity.ok(consumerId);
        } else {
            return ResponseEntity.notFound().build();
        }
    }




}