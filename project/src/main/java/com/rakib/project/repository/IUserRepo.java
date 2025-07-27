package com.rakib.project.repository;

import com.rakib.project.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface IUserRepo extends JpaRepository<User, Integer> {
}

