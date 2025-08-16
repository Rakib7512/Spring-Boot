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

    @ManyToOne
    @JoinColumn(name = "country_id", nullable = false)
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


}
