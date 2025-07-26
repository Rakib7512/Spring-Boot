package com.Imranhss.demo.service;

import com.Imranhss.demo.entity.Division;
import com.Imranhss.demo.repository.IDivisionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DivisionService {
    @Autowired
    private IDivisionRepo divisionRepository;

    public List<Division> getAllDivisions() {
        return divisionRepository.findAll();
    }

//    public List<Divisio> getAllDivisionDTOs() {
//        return getAllDivisions().stream().map(div -> {
//            DivisionResponseDTO dto = new DivisionResponseDTO();
//            dto.setId(div.getId());
//            dto.setName(div.getName());
//
//            List<Integer> districtIds = div.getDistricts().stream()
//                    .map(d -> d.getId())
//                    .toList();
//            dto.setDistricts(districtIds);
//
//            return dto;
//        }).toList();
//    }

    public Division saveDivision(Division division) {
        return divisionRepository.save(division);
    }





}
