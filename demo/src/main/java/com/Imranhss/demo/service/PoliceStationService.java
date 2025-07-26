package com.Imranhss.demo.service;

import com.Imranhss.demo.entity.Policestation;
import com.Imranhss.demo.repository.PoliceStationRepo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class PoliceStationService {

    @Autowired
    private PoliceStationRepo policeeStationRepo;


    public void saveOrUpdate(Policestation ps){
        policeeStationRepo.save(ps);


    }

    public List <Policestation> findAll(){
        return  policeeStationRepo.findAll();
    }

    public Optional<Policestation> findById(int id){
        return  policeeStationRepo.findById(id);

    }
    public void  deleteById(Integer id){

        policeeStationRepo.deleteById(id);
    }


}
