package com.rakib.project.service;

import com.rakib.project.entity.Consumer;
import com.rakib.project.repository.IConsumerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConsumerService {

    @Autowired
    private IConsumerRepo consumerRepo;

    public List<Consumer> getAll() {
        return consumerRepo.findAll();
    }

    public Optional<Consumer> getById(Long id) {
        return consumerRepo.findById(id);
    }
    public  Consumer save(Consumer consumer) {
        return consumerRepo.save(consumer);
    }
    public void deleteById(Long id) {
        consumerRepo.deleteById(id);
    }
}
