package com.rakib.project.repository;

import com.rakib.project.entity.Parcel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IParcelRepository extends JpaRepository<Parcel, Long> {
    Parcel findByTrackingId(String trackingId);
}
