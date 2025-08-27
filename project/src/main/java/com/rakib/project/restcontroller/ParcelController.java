package com.rakib.project.restcontroller;


import com.rakib.project.dto.ParcelResponseDTO;
import com.rakib.project.entity.*;
import com.rakib.project.repository.IEmployeeRepo;
import com.rakib.project.repository.INotificationRepo;
import com.rakib.project.repository.IParcelRepository;
import com.rakib.project.repository.IParcelTrackingRepository;
import com.rakib.project.service.NotificationService;
import com.rakib.project.service.ParcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/parcels/")
public class ParcelController {



    @Autowired
    private IParcelRepository parcelRepo;

    @Autowired
    private IEmployeeRepo employeeRepo;


    @Autowired
    private INotificationRepo notificationRepo;


    @Autowired
    private IParcelTrackingRepository parcelTrackingRepo;

    private final ParcelService parcelService;
    private final NotificationService notificationService;

    public ParcelController(ParcelService parcelService, NotificationService notificationService) {
        this.parcelService = parcelService;
        this.notificationService = notificationService;
    }

    // ----------- Parcel CRUD ------------

    // এখন employerId সহ saveParcel হবে
    @PostMapping("")
    public Parcel createParcel(@RequestBody Parcel parcel)
    { return parcelService.saveParcel(parcel );
    }

    // ✅ Get All Parcels (DTO-based)
    @GetMapping
    public ResponseEntity<List<ParcelResponseDTO>> getAllParcels() {
        List<ParcelResponseDTO> parcelDTOs = parcelService.getAllParcels();
        return ResponseEntity.ok(parcelDTOs);
    }

    // ✅ Get Parcel By Id
    @GetMapping("/{id}")
    public ResponseEntity<Parcel> getParcelById(@PathVariable Long id) {
        Parcel parcel = parcelService.getParcelById(id);
        return ResponseEntity.ok(parcel);
    }

    // ✅ Get Parcel By Tracking Id
    @GetMapping("/track/{trackingId}")
    public ResponseEntity<Optional<Parcel>> getParcelByTrackingId(@PathVariable String trackingId) {
        Optional<Parcel> parcel = parcelService.getParcelByTrackingId(trackingId);
        return ResponseEntity.ok(parcel);
    }

    @DeleteMapping("/{id}")
    public void deleteParcel(@PathVariable Long id) {
        parcelService.deleteParcel(id);
    }

    // ----------- Notification APIs ------------

//    @GetMapping("/notifications/{employerId}")
//    public List<Notification> getEmployerNotifications(@PathVariable Long employerId) {
//        return notificationService.getUnreadNotifications(employerId);
//    }

//    @PutMapping("/notifications/{id}/read")
//    public void markNotificationAsRead(@PathVariable Long id) {
//        notificationService.markAsRead(id);
//    }


    @PutMapping("/parcel/{trackingId}/claimPickup/{employeeId}")
    public ResponseEntity<String> claimPickup(
            @PathVariable String trackingId,
            @PathVariable Long employeeId) {

        Parcel parcel = parcelRepo.findByTrackingId(trackingId)
                .orElseThrow(() -> new RuntimeException("Parcel not found"));

        if (parcel.getPickupDeliveryMan() != null) {
            return ResponseEntity.badRequest()
                    .body("Parcel pickup already assigned to " + parcel.getPickupDeliveryMan().getName());
        }

        Employee emp = employeeRepo.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        parcel.setPickupDeliveryMan(emp);
        parcelRepo.save(parcel);

        // Optional: notify other employees
        List<Employee> others = employeeRepo.findByCountryAndDivisionAndDistrictAndPoliceStation(
                        parcel.getSendCountry(),
                        parcel.getSendDivision(),
                        parcel.getSendDistrict(),
                        parcel.getSendPoliceStation()
                ).stream()
                .filter(e -> !e.getId().equals(emp.getId()))
                .toList();

        for (Employee o : others) {
            Notification n = new Notification();
            n.setEmployee(o);
            n.setMessage("Parcel #" + parcel.getTrackingId() + " pickup has been taken by " + emp.getName());
            notificationRepo.save(n);
        }

        return ResponseEntity.ok("Pickup assigned to " + emp.getName());
    }

// http://localhost:8085/api/parcels/parcel/53e6c9d0-cd0c-47ee-a6e9-7c9366d8d34e/claimPickup/1

//    {
//        "trackingId": "53e6c9d0-cd0c-47ee-a6e9-7c9366d8d34e",
//            "employeeId": 1
//    }



    @PostMapping("/parcel/{trackingId}/transfer")
    public ResponseEntity<String> transferParcel(
            @PathVariable String trackingId,
            @RequestParam String hubName,
            @RequestParam Long employeeId) {

        Parcel parcel = parcelRepo.findByTrackingId(trackingId)
                .orElseThrow(() -> new RuntimeException("Parcel not found"));

        Employee emp = employeeRepo.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        ParcelTracking tracking = new ParcelTracking();
        tracking.setParcel(parcel);
        tracking.setHubName(hubName);
        tracking.setHandledBy(emp);
        tracking.setStatus(ParcelStatus.IN_TRANSIT);
        parcelTrackingRepo.save(tracking);

        return ResponseEntity.ok("Parcel transferred to " + hubName);
    }

   // URL      http://localhost:8085/api/parcels/parcel/53e6c9d0-cd0c-47ee-a6e9-7c9366d8d34e/transfer?hubName=Central%20Hub%20Dhaka&employeeId=1
//   {
//       "hubName": "Central Hub - Dhaka",
//           "employeeId": 2
//   }



    @GetMapping("/parcel/{trackingId}/tracking")
    public ResponseEntity<List<ParcelTracking>> getParcelTracking(@PathVariable String trackingId) {

        Parcel parcel = parcelRepo.findByTrackingId(trackingId)
                .orElseThrow(() -> new RuntimeException("Parcel not found"));

        List<ParcelTracking> trackingList = parcelTrackingRepo.findByParcelIdOrderByTimestampAsc(parcel.getId());

        if (trackingList.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(trackingList);
    }


    //    http://localhost:8085/api/parcels/parcel/53e6c9d0-cd0c-47ee-a6e9-7c9366d8d34e/tracking




}


