package com.Imranhss.demo.repository;

import com.Imranhss.demo.entity.Policestation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PoliceStationRepo extends JpaRepository<Policestation, Integer> {
}
