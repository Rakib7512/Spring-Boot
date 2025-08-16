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


    @Column(name = "address_line_for_sender_1")
    private String addressLineForSender1;

    @Column(name = "address_line_for_sender_2")
    private String addressLineForSender2;


    @Column(name = "address_line_for_Receiver_1")
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



    @OneToMany(mappedBy = "parcel", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ParcelTracking> trackingHistory;

    private Number weight;
    private Number squareFeet;
    private Number fee;
    private String verificationCode;
    private Date bookingDate;

    // 🔹 Relations for sender location
    @ManyToOne
    @JoinColumn(name = "send_country_id")
    private Country sendCountry;

    @ManyToOne
    @JoinColumn(name = "send_division_id")
    private Division sendDivision;

    @ManyToOne
    @JoinColumn(name = "send_district_id")
    private District sendDistrict;

    @ManyToOne
    @JoinColumn(name = "send_police_station_id")
    private PoliceStation sendPoliceStation;

    // 🔹 Relations for receiver location
    @ManyToOne
    @JoinColumn(name = "receive_country_id")
    private Country receiveCountry;

    @ManyToOne
    @JoinColumn(name = "receive_division_id")
    private Division receiveDivision;

    @ManyToOne
    @JoinColumn(name = "receive_district_id")
    private District receiveDistrict;

    @ManyToOne
    @JoinColumn(name = "receive_police_station_id")
    private PoliceStation receivePoliceStation;

    public Parcel() {
    }


    public Parcel(Long id, String addressLineForSender1, String addressLineForSender2, String addressLineForReceiver1, String addressLineForReceiver2, String trackingId, String senderName, String receiverName, String senderPhone, String receiverPhone, String status, String currentHub, String deliveryPerson, Date createdAt, String bookingAgent, List<ParcelTracking> trackingHistory, Number weight, Number squareFeet, Number fee, String verificationCode, Date bookingDate, Country sendCountry, Division sendDivision, District sendDistrict, PoliceStation sendPoliceStation, Country receiveCountry, Division receiveDivision, District receiveDistrict, PoliceStation receivePoliceStation) {
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
        this.trackingHistory = trackingHistory;
        this.weight = weight;
        this.squareFeet = squareFeet;
        this.fee = fee;
        this.verificationCode = verificationCode;
        this.bookingDate = bookingDate;
        this.sendCountry = sendCountry;
        this.sendDivision = sendDivision;
        this.sendDistrict = sendDistrict;
        this.sendPoliceStation = sendPoliceStation;
        this.receiveCountry = receiveCountry;
        this.receiveDivision = receiveDivision;
        this.receiveDistrict = receiveDistrict;
        this.receivePoliceStation = receivePoliceStation;
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

    public Country getSendCountry() {
        return sendCountry;
    }

    public void setSendCountry(Country sendCountry) {
        this.sendCountry = sendCountry;
    }

    public Division getSendDivision() {
        return sendDivision;
    }

    public void setSendDivision(Division sendDivision) {
        this.sendDivision = sendDivision;
    }

    public District getSendDistrict() {
        return sendDistrict;
    }

    public void setSendDistrict(District sendDistrict) {
        this.sendDistrict = sendDistrict;
    }

    public PoliceStation getSendPoliceStation() {
        return sendPoliceStation;
    }

    public void setSendPoliceStation(PoliceStation sendPoliceStation) {
        this.sendPoliceStation = sendPoliceStation;
    }

    public Country getReceiveCountry() {
        return receiveCountry;
    }

    public void setReceiveCountry(Country receiveCountry) {
        this.receiveCountry = receiveCountry;
    }

    public Division getReceiveDivision() {
        return receiveDivision;
    }

    public void setReceiveDivision(Division receiveDivision) {
        this.receiveDivision = receiveDivision;
    }

    public District getReceiveDistrict() {
        return receiveDistrict;
    }

    public void setReceiveDistrict(District receiveDistrict) {
        this.receiveDistrict = receiveDistrict;
    }

    public PoliceStation getReceivePoliceStation() {
        return receivePoliceStation;
    }

    public void setReceivePoliceStation(PoliceStation receivePoliceStation) {
        this.receivePoliceStation = receivePoliceStation;
    }
}
