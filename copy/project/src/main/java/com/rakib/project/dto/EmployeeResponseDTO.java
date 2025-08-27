package com.rakib.project.dto;

import com.rakib.project.entity.Employee;

import java.util.Date;

public class EmployeeResponseDTO {
    private Long id;
    private String name;
    private String email;
    private String gender;
    private String nid;
    private String address;
    private String designation;
    private Date joindate;
    private String phone;
    private String salary;
    private String photo;
    private String empOnHub;

    // Instead of returning full objects, we will return only their IDs
    private int countryId;
    private int divisionId;
    private int districtId;
    private int policeStationId;
    private int userId;

    public EmployeeResponseDTO() {
    }

    public EmployeeResponseDTO(Long id, String name, String email, String gender, String nid, String address, String designation, Date joindate, String phone, String salary, String photo, String empOnHub, int countryId, int divisionId, int districtId, int policeStationId, int userId) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.gender = gender;
        this.nid = nid;
        this.address = address;
        this.designation = designation;
        this.joindate = joindate;
        this.phone = phone;
        this.salary = salary;
        this.photo = photo;
        this.empOnHub = empOnHub;
        this.countryId = countryId;
        this.divisionId = divisionId;
        this.districtId = districtId;
        this.policeStationId = policeStationId;
        this.userId = userId;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
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

    public int getCountryId() {
        return countryId;
    }

    public void setCountryId(int countryId) {
        this.countryId = countryId;
    }

    public int getDivisionId() {
        return divisionId;
    }

    public void setDivisionId(int divisionId) {
        this.divisionId = divisionId;
    }

    public int getDistrictId() {
        return districtId;
    }

    public void setDistrictId(int districtId) {
        this.districtId = districtId;
    }

    public int getPoliceStationId() {
        return policeStationId;
    }

    public void setPoliceStationId(int policeStationId) {
        this.policeStationId = policeStationId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
