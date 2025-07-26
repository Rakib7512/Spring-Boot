package com.Imranhss.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;


@Entity
@Table(name = "districts")
public class District {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 50, nullable = false)
    private String name;


    @OneToMany(mappedBy = "district", cascade = CascadeType.ALL)

    private List<Policestation> policestations;

    public District() {

    }

    public District(List<Policestation> policestations, String name, int id) {

        this.policestations = policestations;
        this.name = name;
        this.id = id;
    }

    public District(List<Policestation>policestations){
        this.policestations=policestations;
    }

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

    public List<Policestation> getPolicestations() {
        return policestations;
    }

    public void setPolicestations(List<Policestation> policestations) {
        this.policestations = policestations;
    }
}



