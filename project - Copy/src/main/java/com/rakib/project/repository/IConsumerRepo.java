package com.rakib.project.repository;

import com.rakib.project.entity.Consumer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface IConsumerRepo extends JpaRepository<Consumer, Long> {

    Optional<Consumer> findByUserId(int userId);

    @Query("SELECT js FROM Consumer js WHERE js.user.email = :email")
    Optional<Consumer> findByUserEmail(@Param("email") String email);

//    @Query("SELECT j FROM Consumer j LEFT JOIN FETCH j.educations WHERE j.id = :id")
//    Optional<JobSeeker> findByIdWithEducations(@Param("id") Long id);
}
