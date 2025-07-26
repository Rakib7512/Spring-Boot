package com.Imranhss.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "policestations")
public class Policestation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id ;

    @Column(length = 50, nullable = false)
    private String name;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "district_id")
    private District district;



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
