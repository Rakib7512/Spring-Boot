package com.rakib.project.entity;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "parcelsDetails")
public class Parcel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String trackingId;
    private String senderName;
    private String receiverName;
    private String senderPhone;
    private String receiverPhone;
    private String senderAddress;
    private String receiverAddress;
    private String status;
    private String currentHub;
    private String deliveryPerson;
    private Date createdAt;
    private String bookingAgent;

    private String sendCountry;
    private String sendDivision;
    private String sendDistrict;
    private String sendPoliceStation;

    private String receiveCountry;
    private String receiveDivision;
    private String receiveDistrict;
    private String receivePoliceStation;

    @OneToMany(mappedBy = "parcel", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ParcelTracking> trackingHistory;

    private Number weight;
    private Number squareFeet;
    private Number fee;
    private String verificationCode;
    private Date bookingDate;

    public Parcel() {
    }

    // Getters and setters for ALL fields

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTrackingId() {
        return trackingId;
    }

    public void setTrackingId(String trackingId) {
        this.trackingId = trackingId;
    }

    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public String getReceiverName() {
        return receiverName;
    }

    public void setReceiverName(String receiverName) {
        this.receiverName = receiverName;
    }

    public String getSenderPhone() {
        return senderPhone;
    }

    public void setSenderPhone(String senderPhone) {
        this.senderPhone = senderPhone;
    }

    public String getReceiverPhone() {
        return receiverPhone;
    }

    public void setReceiverPhone(String receiverPhone) {
        this.receiverPhone = receiverPhone;
    }

    public String getSenderAddress() {
        return senderAddress;
    }

    public void setSenderAddress(String senderAddress) {
        this.senderAddress = senderAddress;
    }

    public String getReceiverAddress() {
        return receiverAddress;
    }

    public void setReceiverAddress(String receiverAddress) {
        this.receiverAddress = receiverAddress;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCurrentHub() {
        return currentHub;
    }

    public void setCurrentHub(String currentHub) {
        this.currentHub = currentHub;
    }

    public String getDeliveryPerson() {
        return deliveryPerson;
    }

    public void setDeliveryPerson(String deliveryPerson) {
        this.deliveryPerson = deliveryPerson;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public String getBookingAgent() {
        return bookingAgent;
    }

    public void setBookingAgent(String bookingAgent) {
        this.bookingAgent = bookingAgent;
    }

    public String getSendCountry() {
        return sendCountry;
    }

    public void setSendCountry(String sendCountry) {
        this.sendCountry = sendCountry;
    }

    public String getSendDivision() {
        return sendDivision;
    }

    public void setSendDivision(String sendDivision) {
        this.sendDivision = sendDivision;
    }

    public String getSendDistrict() {
        return sendDistrict;
    }

    public void setSendDistrict(String sendDistrict) {
        this.sendDistrict = sendDistrict;
    }

    public String getSendPoliceStation() {
        return sendPoliceStation;
    }

    public void setSendPoliceStation(String sendPoliceStation) {
        this.sendPoliceStation = sendPoliceStation;
    }

    public String getReceiveCountry() {
        return receiveCountry;
    }

    public void setReceiveCountry(String receiveCountry) {
        this.receiveCountry = receiveCountry;
    }

    public String getReceiveDivision() {
        return receiveDivision;
    }

    public void setReceiveDivision(String receiveDivision) {
        this.receiveDivision = receiveDivision;
    }

    public String getReceiveDistrict() {
        return receiveDistrict;
    }

    public void setReceiveDistrict(String receiveDistrict) {
        this.receiveDistrict = receiveDistrict;
    }

    public String getReceivePoliceStation() {
        return receivePoliceStation;
    }

    public void setReceivePoliceStation(String receivePoliceStation) {
        this.receivePoliceStation = receivePoliceStation;
    }

    public List<ParcelTracking> getTrackingHistory() {
        return trackingHistory;
    }

    public void setTrackingHistory(List<ParcelTracking> trackingHistory) {
        this.trackingHistory = trackingHistory;
    }

    public Number getWeight() {
        return weight;
    }

    public void setWeight(Number weight) {
        this.weight = weight;
    }

    public Number getSquareFeet() {
        return squareFeet;
    }

    public void setSquareFeet(Number squareFeet) {
        this.squareFeet = squareFeet;
    }

    public Number getFee() {
        return fee;
    }

    public void setFee(Number fee) {
        this.fee = fee;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    public Date getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(Date bookingDate) {
        this.bookingDate = bookingDate;
    }
}
