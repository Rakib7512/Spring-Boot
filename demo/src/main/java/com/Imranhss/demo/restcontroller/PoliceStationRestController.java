package com.Imranhss.demo.restcontroller;

import com.Imranhss.demo.entity.Policestation;
import com.Imranhss.demo.service.PoliceStationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

public class PoliceStationRestController {

    @Autowired
    private PoliceStationService policeStationService;

    @PostMapping
    public void save(@RequestBody Policestation ps){

        policeStationService.saveOrUpdate(ps);
    }
    @GetMapping("{id}")
    public Policestation getById(@PathVariable Integer id){
        return policeStationService.findById(id).get();
    }
    @DeleteMapping
    public void deleteById(@PathVariable Integer id){
        policeStationService.deleteById(id);
    }

    @PutMapping("{id}")
    public  void  Update(@RequestBody Policestation ps){
        policeStationService.saveOrUpdate(ps);
    }




}
