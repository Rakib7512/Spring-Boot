package com.rakib.project.entity;

import jakarta.persistence.*;

import java.util.Date;


@Entity
@Table(name = "parcelTracking")
    public class ParcelTracking {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String hubName;

        @Temporal(TemporalType.TIMESTAMP)
        private Date timestamp;

        @ManyToOne
        @JoinColumn(name = "parcel_id") // foreign key
        private Parcel parcel;

        // Getters and Setters
        public Long getId() {
            return id; }

        public void setId(Long id) {
            this.id = id; }

        public String getHubName() {
            return hubName; }

        public void setHubName(String hubName) {
            this.hubName = hubName; }

        public Date getTimestamp() {
            return timestamp; }

        public void setTimestamp(Date timestamp) {
            this.timestamp = timestamp; }

        public Parcel getParcel() {
            return parcel; }
        public void setParcel(Parcel parcel) { this.parcel = parcel; }
    }

