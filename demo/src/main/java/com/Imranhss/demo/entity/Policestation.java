package com.Imranhss.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

public class Policestation {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id ;

    @Column(length = 50, nullable = false)
    private String name;


    public Policestation(){

    }

    public Policestation(int id, String name){}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
