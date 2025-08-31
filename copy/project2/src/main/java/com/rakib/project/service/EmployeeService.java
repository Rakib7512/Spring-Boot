package com.rakib.project.service;




import com.rakib.project.dto.*;
import com.rakib.project.entity.*;
import com.rakib.project.repository.IEmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
@Service
public class EmployeeService {
    @Autowired
    private IEmployeeRepo employeeRepository;

    public List<Employee> getAll() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> getById(Long id) {
        return employeeRepository.findById(id);
    }

    public Employee save(Employee employee) {
        return employeeRepository.save(employee);
    }

    public void delete(Long id) {
        employeeRepository.deleteById(id);
    }

    public Employee getProfileByUserId(int userId) {
        return employeeRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Job Seeker not found"));
    }





    public List<EmployeeResponseDTO> getAllAttendanceResponseDTOS() {
        return employeeRepository.findAll().stream().map(atten -> {
            EmployeeResponseDTO dto = new EmployeeResponseDTO();
            dto.setId(atten.getId());
            dto.setName(atten.getName());
            dto.setEmail(atten.getEmail());
            dto.setPhone(atten.getPhone());
            dto.setGender(atten.getGender());
            dto.setNid(atten.getNid());
            dto.setAddress(atten.getAddress());
            dto.setDesignation(atten.getDesignation());
            dto.setJoindate(atten.getJoindate());
            dto.setSalary(atten.getSalary());
            dto.setPhoto(atten.getPhoto());
            dto.setEmpOnHub(atten.getEmpOnHub());

            Country country = atten.getCountry();
            if (country != null) {
                CountryResponseDTO countryResponseDTO = new CountryResponseDTO();
            countryResponseDTO.setId(country.getId());
            countryResponseDTO.setName(countryResponseDTO.getName());

            dto.setCountryId(countryResponseDTO);


        }

            Division division = atten.getDivision();
            if (division != null) {
                DivisionResponseDTO divisionResponseDTO = new DivisionResponseDTO();
                divisionResponseDTO.setId(division.getId());
                divisionResponseDTO.setName(divisionResponseDTO.getName());

                dto.setDivisionId(divisionResponseDTO);


            }

            District district = atten.getDistrict();
            if (district != null) {
                DistrictResponseDTO districtResponseDTO = new DistrictResponseDTO();
                districtResponseDTO.setId(division.getId());
                districtResponseDTO.setName(districtResponseDTO.getName());

                dto.setDistrictId(districtResponseDTO);


            }



            return dto;
        }).toList();
    }

}