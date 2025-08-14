package com.rakib.project.restcontroller;


import com.rakib.project.entity.Parcel;
import com.rakib.project.service.ParcelService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parcels/")
public class ParcelController {
    private final ParcelService parcelService;

    public ParcelController(ParcelService parcelService) {
        this.parcelService = parcelService;
    }

    @PostMapping
    public Parcel createParcel(@RequestBody Parcel parcel) {
        return parcelService.saveParcel(parcel);
    }

    @GetMapping
    public List<Parcel> getAllParcels() {
        return parcelService.getAllParcels();
    }

    @GetMapping("/{id}")
    public Parcel getParcelById(@PathVariable Long id) {
        return parcelService.getParcelById(id);
    }

    @GetMapping("/track/{trackingId}")
    public Parcel getParcelByTrackingId(@PathVariable String trackingId) {
        return parcelService.getParcelByTrackingId(trackingId);
    }

    @DeleteMapping("/{id}")
    public void deleteParcel(@PathVariable Long id) {
        parcelService.deleteParcel(id);
    }
}


