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
    private IConsumerRepo consumerRepository;

    public List<Consumer> getAll() {
        return consumerRepository.findAll();
    }

    public Optional<Consumer> getById(Long id) {
        return consumerRepository.findById(id);
    }

    public Consumer save(Consumer consumer) {
        return consumerRepository.save(consumer);
    }

    public void delete(Long id) {
        consumerRepository.deleteById(id);
    }
}