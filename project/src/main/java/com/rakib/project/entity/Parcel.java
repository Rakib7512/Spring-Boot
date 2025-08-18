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


    @Column(name = "address_line_for_sender_1", nullable = false)
    private String addressLineForSender1;

    @Column(name = "address_line_for_sender_2")
    private String addressLineForSender2;


    @Column(name = "address_line_for_Receiver_1", nullable = false)
    private String addressLineForReceiver1;

    @Column(name = "address_line_for_Receiver_2")
    private String addressLineForReceiver2;

    private String trackingId;
    private String senderName;
    private String receiverName;
    private String senderPhone;
    private String receiverPhone;
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

    @ManyToOne
    @JoinColumn(name = "country_id", nullable = false)
    private Country country;

    @ManyToOne
    @JoinColumn(name = "division_id", nullable = false)
    private Division division;

    @ManyToOne
    @JoinColumn(name = "district_id",  nullable = false)
    private District district;

    @ManyToOne
    @JoinColumn(name = "policeStation_id", nullable = false)
    private PoliceStation policeStation;

    public Parcel() {
    }

    public Parcel(Long id, String addressLineForSender1, String addressLineForSender2, String addressLineForReceiver1, String addressLineForReceiver2, String trackingId, String senderName, String receiverName, String senderPhone, String receiverPhone, String status, String currentHub, String deliveryPerson, Date createdAt, String bookingAgent, String sendCountry, String sendDivision, String sendDistrict, String sendPoliceStation, String receiveCountry, String receiveDivision, String receiveDistrict, String receivePoliceStation, List<ParcelTracking> trackingHistory, Number weight, Number squareFeet, Number fee, String verificationCode, Date bookingDate, Country country, Division division, District district, PoliceStation policeStation) {
        this.id = id;
        this.addressLineForSender1 = addressLineForSender1;
        this.addressLineForSender2 = addressLineForSender2;
        this.addressLineForReceiver1 = addressLineForReceiver1;
        this.addressLineForReceiver2 = addressLineForReceiver2;
        this.trackingId = trackingId;
        this.senderName = senderName;
        this.receiverName = receiverName;
        this.senderPhone = senderPhone;
        this.receiverPhone = receiverPhone;
        this.status = status;
        this.currentHub = currentHub;
        this.deliveryPerson = deliveryPerson;
        this.createdAt = createdAt;
        this.bookingAgent = bookingAgent;
        this.sendCountry = sendCountry;
        this.sendDivision = sendDivision;
        this.sendDistrict = sendDistrict;
        this.sendPoliceStation = sendPoliceStation;
        this.receiveCountry = receiveCountry;
        this.receiveDivision = receiveDivision;
        this.receiveDistrict = receiveDistrict;
        this.receivePoliceStation = receivePoliceStation;
        this.trackingHistory = trackingHistory;
        this.weight = weight;
        this.squareFeet = squareFeet;
        this.fee = fee;
        this.verificationCode = verificationCode;
        this.bookingDate = bookingDate;
        this.country = country;
        this.division = division;
        this.district = district;
        this.policeStation = policeStation;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddressLineForSender1() {
        return addressLineForSender1;
    }

    public void setAddressLineForSender1(String addressLineForSender1) {
        this.addressLineForSender1 = addressLineForSender1;
    }

    public String getAddressLineForSender2() {
        return addressLineForSender2;
    }

    public void setAddressLineForSender2(String addressLineForSender2) {
        this.addressLineForSender2 = addressLineForSender2;
    }

    public String getAddressLineForReceiver1() {
        return addressLineForReceiver1;
    }

    public void setAddressLineForReceiver1(String addressLineForReceiver1) {
        this.addressLineForReceiver1 = addressLineForReceiver1;
    }

    public String getAddressLineForReceiver2() {
        return addressLineForReceiver2;
    }

    public void setAddressLineForReceiver2(String addressLineForReceiver2) {
        this.addressLineForReceiver2 = addressLineForReceiver2;
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

    // Getters and setters for ALL fields


}
