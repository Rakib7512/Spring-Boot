package com.Imranhss.demo.repository;

import com.Imranhss.demo.entity.District;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IDistrictRepo extends JpaRepository<District, Integer> {
    public District findByName(String name);
}
