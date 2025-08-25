package com.rakib.project.dto;

import java.util.Date;
import java.util.List;

public class ParcelResponseDTO {

    private Long id;
    private String trackingId;
    private String senderName;
    private String senderPhone;
    private String receiverName;
    private String receiverPhone;

    private String addressLineForSender1;
    private String addressLineForSender2;
    private String addressLineForReceiver1;
    private String addressLineForReceiver2;

    private String currentHub;
    private String size;
    private Number fee;
    private String verificationCode;

    private Date createdAt;
    private Date bookingDate;

    private String status;

    private Long pickupDeliveryManId;
    private Long deliveryManId;
    private Long bookingAgentId;

    private int sendCountryId;
    private int sendDivisionId;
    private int sendDistrictId;
    private int sendPoliceStationId;

    private int receiveCountryId;
    private int receiveDivisionId;
    private int receiveDistrictId;
    private int receivePoliceStationId;

//    private List<ParcelTrackingDTO> trackingHistory;

    // Getters and Setters


}

