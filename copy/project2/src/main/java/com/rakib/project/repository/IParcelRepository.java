package com.rakib.project.repository;

import com.rakib.project.dto.ParcelResponseDTO;
import com.rakib.project.entity.Parcel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface IParcelRepository extends JpaRepository<Parcel, Long> {


    Optional<Parcel> findByTrackingId(String trackingId);








}
