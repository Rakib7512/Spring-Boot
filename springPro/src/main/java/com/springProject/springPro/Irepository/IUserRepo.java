package com.springProject.springPro.Irepository;

import com.springProject.springPro.entity.User;
import org.springframework.data.repository.CrudRepository;

public interface IUserRepo extends CrudRepository<User,Integer> {
}
