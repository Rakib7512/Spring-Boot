package com.Imranhss.demo.service;

import com.Imranhss.demo.dto.DistrictResponseDTO;
import com.Imranhss.demo.entity.District;
import com.Imranhss.demo.repository.IDistrictRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DistrictService {
    @Autowired
    private IDistrictRepo districtRepo;

    public void save(District district){
        districtRepo.save(district);
    }
    public List<District>getAllDistricts(){
        return districtRepo.findAll();
    }


    public List<DistrictResponseDTO>getAlDistrictResponseDTOS(){
        List<District> districts=getAllDistricts();

        return districts.stream().map(d->{
            DistrictResponseDTO dto=new DistrictResponseDTO();
            dto.setId(d.getId());
            dto.setName(d.getName());

            List<Integer> psIds=d.getPolicestations().stream()
                    .map(ps->ps.getId())
                    .toList();

            dto.setPoliceStation(psIds);
            return  dto;

        }).toList();

    }

    public  District getDistrictById(int id){
        return districtRepo.findById(id).get();
    }

    public void deleteDistrictById(int id){
        districtRepo.deleteById(id);
    }
    public District getDistrictByName(String namme){
        return  districtRepo.findByName(namme);
    }
}
