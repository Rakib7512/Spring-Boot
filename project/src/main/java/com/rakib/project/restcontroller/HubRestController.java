package com.rakib.project.restcontroller;


import com.rakib.project.entity.Hub;
import com.rakib.project.repository.HubRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hubs")
public class HubRestController {

    private final HubRepository hubRepository;

    public HubRestController(HubRepository hubRepository) {
        this.hubRepository = hubRepository;
    }

    @GetMapping
    public List<Hub> getAllHubs() {
        return hubRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Hub> createHub(@RequestBody Hub hub) {
        if (hubRepository.existsByCode(hub.getCode())) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(hubRepository.save(hub));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hub> getHub(@PathVariable Long id) {
        return hubRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Hub> updateHub(@PathVariable Long id, @RequestBody Hub updatedHub) {
        return hubRepository.findById(id).map(hub -> {
            hub.setName(updatedHub.getName());
            hub.setCode(updatedHub.getCode());
            hub.setAddress(updatedHub.getAddress());
            hub.setContactNumber(updatedHub.getContactNumber());
            hub.setActive(updatedHub.isActive());
            return ResponseEntity.ok(hubRepository.save(hub));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHub(@PathVariable Long id) {
        if (!hubRepository.existsById(id)) return ResponseEntity.notFound().build();
        hubRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
