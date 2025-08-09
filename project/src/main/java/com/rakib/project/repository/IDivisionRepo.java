package com.rakib.project.repository;

import com.rakib.project.entity.Division;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IDivisionRepo extends JpaRepository<Division,Integer> {
}
