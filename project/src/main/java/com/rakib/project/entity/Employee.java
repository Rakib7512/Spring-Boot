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

    private String designation;
    private Date joindate;
    private String phoneNo;
    private String salary;
    private String photo;
    private String empOnHub;


    @OneToMany(mappedBy = "employee") // ✅ এখন 'employee' field Country entity তে থাকতে হবে
    private List<Country> countries;


    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    private List<Division> divisions;
        // ID of selected division


    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    private List<District> districts;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    private List<PoliceStation> policeStations;




    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Employee(Long id, String name, String email, String gender, String designation, Date joindate, String phoneNo, String salary, String photo, String empOnHub, List<Country> countries, List<Division> divisions, List<District> districts, List<PoliceStation> policeStations, User user) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.gender = gender;

        this.designation = designation;
        this.joindate = joindate;
        this.phoneNo = phoneNo;
        this.salary = salary;
        this.photo = photo;
        this.empOnHub = empOnHub;
        this.countries = countries;
        this.divisions = divisions;
        this.districts = districts;
        this.policeStations = policeStations;
        this.user = user;
    }

    public Employee() {

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

    public List<Country> getCountries() {
        return countries;
    }

    public void setCountries(List<Country> countries) {
        this.countries = countries;
    }

    public List<Division> getDivisions() {
        return divisions;
    }

    public void setDivisions(List<Division> divisions) {
        this.divisions = divisions;
    }

    public List<District> getDistricts() {
        return districts;
    }

    public void setDistricts(List<District> districts) {
        this.districts = districts;
    }

    public List<PoliceStation> getPoliceStations() {
        return policeStations;
    }

    public void setPoliceStations(List<PoliceStation> policeStations) {
        this.policeStations = policeStations;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
