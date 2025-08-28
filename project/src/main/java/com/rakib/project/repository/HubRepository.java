package com.rakib.project.repository;

import com.rakib.project.entity.Hub;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface HubRepository extends JpaRepository<Hub, Long> {
    Optional<Hub> findByName(String name);
}
