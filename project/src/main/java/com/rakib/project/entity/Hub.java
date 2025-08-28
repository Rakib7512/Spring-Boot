package com.rakib.project.entity;


import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Hub {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(unique = true)
    private String code;

    private String address;

    private String contactNumber;

    private boolean isActive = true;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    // Optional: Link to location hierarchy if needed
    @ManyToOne
    @JoinColumn(name = "division_id")
    private Division division;

    @ManyToOne
    @JoinColumn(name = "district_id")
    private District district;

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
    }

    // Constructors, Getters, Setters...

    public Hub() {
    }

    public Hub(Long id, String name, String code, String address, String contactNumber, boolean isActive, Date createdAt, Division division, District district) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.address = address;
        this.contactNumber = contactNumber;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.division = division;
        this.district = district;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Division getDivision() {
        return division;
    }

    public void setDivision(Division division) {
        this.division = division;
    }

    public District getDistrict() {
        return district;
    }

    public void setDistrict(District district) {
        this.district = district;
    }
}
