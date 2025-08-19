package com.rakib.project.restcontroller;


import com.rakib.project.entity.Notification;
import com.rakib.project.entity.Parcel;
import com.rakib.project.service.NotificationService;
import com.rakib.project.service.ParcelService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parcels/")
public class ParcelController {
    private final ParcelService parcelService;
    private final NotificationService notificationService;

    public ParcelController(ParcelService parcelService, NotificationService notificationService) {
        this.parcelService = parcelService;
        this.notificationService = notificationService;
    }

    // ----------- Parcel CRUD ------------

    // এখন employerId সহ saveParcel হবে
    @PostMapping("/{employerId}")
    public Parcel createParcel(@RequestBody Parcel parcel,
                               @PathVariable Long employerId) {
        return parcelService.saveParcel(parcel, employerId);
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

    // ----------- Notification APIs ------------

    @GetMapping("/notifications/{employerId}")
    public List<Notification> getEmployerNotifications(@PathVariable Long employerId) {
        return notificationService.getUnreadNotifications(employerId);
    }

    @PutMapping("/notifications/{id}/read")
    public void markNotificationAsRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
    }
}


