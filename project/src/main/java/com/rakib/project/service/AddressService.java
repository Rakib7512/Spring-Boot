package com.rakib.project.service;

import com.rakib.project.dto.AddressResponseDTO;
import com.rakib.project.dto.AuthenticationResponse;
import com.rakib.project.entity.*;
import com.rakib.project.jwt.JwtService;
import com.rakib.project.repository.AddressRepository;
import com.rakib.project.repository.ITokenRepository;
import com.rakib.project.repository.IUserRepo;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class AddressService {




}