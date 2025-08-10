package com.rakib.project.repository;

import com.rakib.project.entity.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IDistrictRepo extends JpaRepository<District,Integer> {
    @Query("SELECT DISTINCT d FROM District d LEFT JOIN FETCH d.policeStations")
    List<District> findAllWithPoliceStations();

    District findByName(String name);
}
