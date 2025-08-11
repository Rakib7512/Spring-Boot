package com.rakib.project.repository;

import com.rakib.project.entity.ParcelTracking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IParcelTrackingRepository extends JpaRepository<ParcelTracking, Long> {
}
