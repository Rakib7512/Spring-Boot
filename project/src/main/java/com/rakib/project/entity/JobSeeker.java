package com.rakib.project.entity;

import jakarta.persistence.Id;

public class JobSeeker {

    @Id
    private String id;
    private String name;
    private String email ;
    private String phone;
}
