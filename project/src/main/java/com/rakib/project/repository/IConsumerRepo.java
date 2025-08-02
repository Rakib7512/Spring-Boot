package com.rakib.project.repository;

import com.rakib.project.entity.Consumer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface IConsumerRepo extends JpaRepository<Consumer, Long> {
}
