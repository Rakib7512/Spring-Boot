package com.rakib.project.service;

import com.rakib.project.entity.PoliceStation;
import com.rakib.project.repository.IPoliceStationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class PoliceStationService {
    @Autowired
    private IPoliceStationRepo policeStationRepo;


    public void saveOrUpdate(PoliceStation ps) {
        policeStationRepo.save(ps);
    }


    public List<PoliceStation> findAll() {

        return policeStationRepo.findAll();
    }

    public Optional<PoliceStation> findById(Integer id) {
        return policeStationRepo.findById(id);
    }

    public void deleteById(Integer id) {
        policeStationRepo.deleteById(id);
    }



}
