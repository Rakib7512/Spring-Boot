package com.Imranhss.demo.dto;

import java.util.List;

public class DistrictResponseDTO {
    private  int id;
    private String name;
    private List<Integer>policeStation;

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

    public List<Integer> getPoliceStation() {
        return policeStation;
    }

    public void setPoliceStation(List<Integer> policeStation) {
        this.policeStation = policeStation;
    }
}
