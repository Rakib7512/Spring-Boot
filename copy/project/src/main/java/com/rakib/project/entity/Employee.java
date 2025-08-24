package com.rakib.project.entity;


import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name ="employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private  String email;
    private  String gender;
    private  String nid;
    private  String address;

    private String designation;
    private Date joindate;
    private String phoneNo;
    private String salary;
    private String photo;
    private String empOnHub;


    @OneToOne
    @JoinColumn(name = "country_id", nullable = false)
    private Country country;



    @OneToOne
    @JoinColumn(name = "division_id", nullable = false)
    private Division division;

    @OneToOne
    @JoinColumn(name = "district_id", nullable = false)
    private District district;

    @OneToOne
    @JoinColumn(name = "policeStation_id", nullable = false)
    private PoliceStation policeStation;




    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Employee() {
    }

    public Employee(Long id, String name, String gender, String email, String nid, String address, String designation, String phoneNo, Date joindate, String salary, String photo, String empOnHub, Country country, Division division, District district, PoliceStation policeStation, User user) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.email = email;
        this.nid = nid;
        this.address = address;
        this.designation = designation;
        this.phoneNo = phoneNo;
        this.joindate = joindate;
        this.salary = salary;
        this.photo = photo;
        this.empOnHub = empOnHub;
        this.country = country;
        this.division = division;
        this.district = district;
        this.policeStation = policeStation;
        this.user = user;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getNid() {
        return nid;
    }

    public void setNid(String nid) {
        this.nid = nid;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public Date getJoindate() {
        return joindate;
    }

    public void setJoindate(Date joindate) {
        this.joindate = joindate;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getSalary() {
        return salary;
    }

    public void setSalary(String salary) {
        this.salary = salary;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getEmpOnHub() {
        return empOnHub;
    }

    public void setEmpOnHub(String empOnHub) {
        this.empOnHub = empOnHub;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
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

    public PoliceStation getPoliceStation() {
        return policeStation;
    }

    public void setPoliceStation(PoliceStation policeStation) {
        this.policeStation = policeStation;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
