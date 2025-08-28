package com.rakib.project.entity;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "parcel_details")
public class Parcel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "address_line_for_sender_1")
    private String addressLineForSender1;

    @Column(name = "address_line_for_sender_2")
    private String addressLineForSender2;

    @Column(name = "address_line_for_receiver_1")
    private String addressLineForReceiver1;

    @Column(name = "address_line_for_receiver_2")
    private String addressLineForReceiver2;

    @Column(name = "tracking_id")
    private String trackingId;

    @Column(name = "sender_name")
    private String senderName;

    @Column(name = "receiver_name")
    private String receiverName;

    @Column(name = "sender_phone")
    private String senderPhone;

    @Column(name = "receiver_phone")
    private String receiverPhone;

    @ManyToOne
    @JoinColumn(name = "current_hub_id")
    private Hub currentHub;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", updatable = false)
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "booking_date")
    private Date bookingDate;

    @Column(name = "size")
    private String size;

    @Column(name = "fee")
    private int fee;

    @Column(name = "verification_code")
    private String verificationCode;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ParcelStatus status = ParcelStatus.BOOKED;

    // Assigned Employees
    @ManyToOne
    @JoinColumn(name = "pickup_deliveryman_id")
    private Employee pickupDeliveryMan;

    @ManyToOne
    @JoinColumn(name = "deliveryman_id")
    private Employee deliveryMan;

    @ManyToOne
    @JoinColumn(name = "booking_agent_id")
    private Employee bookingAgent;

    // Tracking History
    @OneToMany(mappedBy = "parcel", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ParcelTracking> trackingHistory;

    // Sender location
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

    // Receiver location
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




    // Auto-set timestamps
    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
        this.bookingDate = new Date();
    }



    // --- Constructors, Getters, and Setters ---

    public Parcel() {}

    // You can add a full-args constructor if needed, but omitted here for brevity

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

    public Hub getCurrentHub() {
        return currentHub;
    }

    public void setCurrentHub(Hub currentHub) {
        this.currentHub = currentHub;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Employee getPickupDeliveryMan() {
        return pickupDeliveryMan;
    }

    public void setPickupDeliveryMan(Employee pickupDeliveryMan) {
        this.pickupDeliveryMan = pickupDeliveryMan;
    }

    public Employee getDeliveryMan() {
        return deliveryMan;
    }

    public void setDeliveryMan(Employee deliveryMan) {
        this.deliveryMan = deliveryMan;
    }

    public ParcelStatus getStatus() {
        return status;
    }

    public void setStatus(ParcelStatus status) {
        this.status = status;
    }

    public List<ParcelTracking> getTrackingHistory() {
        return trackingHistory;
    }

    public void setTrackingHistory(List<ParcelTracking> trackingHistory) {
        this.trackingHistory = trackingHistory;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public int getFee() {
        return fee;
    }

    public void setFee(int fee) {
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

    public Employee getBookingAgent() {
        return bookingAgent;
    }

    public void setBookingAgent(Employee bookingAgent) {
        this.bookingAgent = bookingAgent;
    }
}
