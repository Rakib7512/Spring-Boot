package com.rakib.project.repository;

import com.rakib.project.entity.PoliceStation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPoliceStationRepo extends JpaRepository<PoliceStation,Integer> {
}
