package com.rakib.project.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Date;


@Entity
@Table(name = "parcelTracking")
public class ParcelTracking {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Hub info (PoliceStation is your hub)
    @ManyToOne
    @JoinColumn(name = "hub_id", nullable = false)
    private PoliceStation hub;

    // Which employee handled this update
    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee handledBy;

    @ManyToOne
    @JoinColumn(name = "parcel_id", nullable = false)
    private Parcel parcel;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ParcelStatus status;  // Enum type for strict control

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // Auto set timestamp before save
    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }

    // Getters & Setters


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PoliceStation getHub() {
        return hub;
    }

    public void setHub(PoliceStation hub) {
        this.hub = hub;
    }

    public Employee getHandledBy() {
        return handledBy;
    }

    public void setHandledBy(Employee handledBy) {
        this.handledBy = handledBy;
    }

    public Parcel getParcel() {
        return parcel;
    }

    public void setParcel(Parcel parcel) {
        this.parcel = parcel;
    }

    public ParcelStatus getStatus() {
        return status;
    }

    public void setStatus(ParcelStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

