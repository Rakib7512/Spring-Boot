package com.rakib.project.config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class WebConfig {

    @Value("${image.upload.dir}")
    private String uploadDir;




}
