package com.rakib.project.dto;

import java.util.List;

public class CountryResponseDTO {
    private int id;
    private String name;

    public CountryResponseDTO(int id, String name) {
    }

    public CountryResponseDTO() {

    }


    // Getters & setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


}