package com.rakib.project.repository;

import com.rakib.project.entity.District;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IDistrictRepo extends JpaRepository<District,Integer> {
    District findByName(String name);
}
