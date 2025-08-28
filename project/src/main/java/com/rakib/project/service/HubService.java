package com.rakib.project.service;

import com.rakib.project.entity.Hub;
import com.rakib.project.repository.HubRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HubService {
    @Autowired
    private HubRepository hubRepository;

    // 🔹 সব হাব লিস্ট আকারে ফেরত দিবে
    public List<Hub> getAllHubs() {
        return hubRepository.findAll();
    }

    // 🔹 আইডি দিয়ে হাব খুঁজে আনবে
    public Optional<Hub> getHubById(Long id) {
        return hubRepository.findById(id);
    }

    // 🔹 নতুন হাব তৈরি করবে
    public Hub createHub(Hub hub) {
        if (hubRepository.existsByCode(hub.getCode())) {
            throw new RuntimeException("Hub already exists with code: " + hub.getCode());
        }
        return hubRepository.save(hub);
    }

    // 🔹 হাব আপডেট করবে
    @Transactional
    public Hub updateHub(Long id, Hub updatedHub) {
        return hubRepository.findById(id).map(hub -> {
            hub.setName(updatedHub.getName());
            hub.setCode(updatedHub.getCode());
            hub.setAddress(updatedHub.getAddress());
            hub.setContactNumber(updatedHub.getContactNumber());
            hub.setActive(updatedHub.isActive());
            hub.setDivision(updatedHub.getDivision());
            hub.setDistrict(updatedHub.getDistrict());
            return hubRepository.save(hub);
        }).orElseThrow(() -> new RuntimeException("Hub not found with id: " + id));
    }

    // 🔹 হাব ডিলিট করবে
    public void deleteHub(Long id) {
        if (!hubRepository.existsById(id)) {
            throw new RuntimeException("Hub not found with id: " + id);
        }
        hubRepository.deleteById(id);
    }
}
