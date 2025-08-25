package com.rakib.project.repository;

import com.rakib.project.entity.Parcel;
import com.rakib.project.entity.ParcelTracking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IParcelRepository extends JpaRepository<Parcel, Long> {


    Optional<Parcel> findByTrackingId(String trackingId);




}
