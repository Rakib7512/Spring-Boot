package com.rakib.project.service;

import com.rakib.project.dto.ParcelResponseDTO;
import com.rakib.project.entity.Employee;
import com.rakib.project.entity.Parcel;
import com.rakib.project.entity.ParcelTracking;
import com.rakib.project.repository.IEmployeeRepo;
import com.rakib.project.repository.IParcelRepository;
import com.rakib.project.repository.IParcelTrackingRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ParcelService {

    @Autowired
    private  IParcelRepository parcelRepository;
    @Autowired
    private  IParcelTrackingRepository trackingRepository;

    @Autowired
    private  NotificationService notificationService;

    @Autowired
    private IEmployeeRepo  employeeRepo;



    // ---------- Save Parcel  ----------
//    @Transactional
//    public Parcel saveParcel(Parcel parcel ) {
//        if (parcel.getTrackingHistory() != null) {
//            for (ParcelTracking t : parcel.getTrackingHistory()) {
//                t.setParcel(parcel);
//            }
//        }
//
//        Parcel savedParcel = parcelRepository.save(parcel);
//
////        // Employer কে notification পাঠানো
////        notificationService.createNotification(
////                "New Parcel booked: Tracking ID = " + savedParcel.getTrackingId(),
////                employerId
////        );
//
//        return savedParcel;
//    }


public Parcel saveParcel(Parcel parcel) {
    Parcel saved = parcelRepository.save(parcel);

    // 🔹 Find employees in the same location as sender
    List<Employee> employees = employeeRepo.findByCountryAndDivisionAndDistrictAndPoliceStation(
            saved.getSendCountry(),
            saved.getSendDivision(),
            saved.getSendDistrict(),
            saved.getSendPoliceStation()
    );



    // 🔹 Send notification
    if (!employees.isEmpty()) {
        notificationService.notifyEmployees(
                employees,
                "New parcel booked in your area with tracking ID: " + saved.getTrackingId()
        );
    }

    return saved;
}



    public List<Parcel> getAllParcels() {
        return parcelRepository.findAll();
    }

    public Parcel getParcelById(Long id) {
        return parcelRepository.findById(id).orElse(null);
    }

    public Optional<Parcel> getParcelByTrackingId(String trackingId) {
        return parcelRepository.findByTrackingId(trackingId);
    }

    public void deleteParcel(Long id) {
        parcelRepository.deleteById(id);
    }

    // ---------- Tracking specific methods ----------

    @Transactional
    public ParcelTracking addTrackingToParcel(Long parcelId, ParcelTracking tracking) {
        Parcel parcel = parcelRepository.findById(parcelId)
                .orElseThrow(() -> new IllegalArgumentException("Parcel not found with id: " + parcelId));

        // set bi-directional link
        tracking.setParcel(parcel);

        // save tracking
        ParcelTracking saved = trackingRepository.save(tracking);

        // also ensure parcel's list contains it (optional but keeps entity state consistent)
        if (parcel.getTrackingHistory() == null) {
            parcel.setTrackingHistory(new ArrayList<>());
        }
        parcel.getTrackingHistory().add(saved);

        parcelRepository.save(parcel);

        return saved;
    }

    public List<ParcelTracking> getTrackingForParcel(Long parcelId) {
        Parcel parcel = parcelRepository.findById(parcelId)
                .orElseThrow(() -> new IllegalArgumentException("Parcel not found with id: " + parcelId));
        return parcel.getTrackingHistory() == null ? List.of() : parcel.getTrackingHistory();
    }

    @Transactional
    public void removeTracking(Long parcelId, Long trackingId) {
        Parcel parcel = parcelRepository.findById(parcelId)
                .orElseThrow(() -> new IllegalArgumentException("Parcel not found with id: " + parcelId));

        Optional<ParcelTracking> opt = trackingRepository.findById(trackingId);
        if (opt.isEmpty()) {
            throw new IllegalArgumentException("Tracking not found with id: " + trackingId);
        }
        ParcelTracking t = opt.get();

        if (!t.getParcel().getId().equals(parcel.getId())) {
            throw new IllegalArgumentException("Tracking does not belong to the given parcel");
        }

        // remove from parcel list
        if (parcel.getTrackingHistory() != null) {
            parcel.getTrackingHistory().removeIf(x -> x.getId().equals(trackingId));
            parcelRepository.save(parcel);
        }

        trackingRepository.deleteById(trackingId);
    }

//    @Transactional
//    public Parcel receiveParcel(Long parcelId, Long employeeId, String employeeName, String currentHub) {
//        Parcel parcel = parcelRepository.findById(parcelId)
//                .orElseThrow(() -> new IllegalArgumentException("Parcel not found"));
//
//        parcel.setReceivedByEmployeeId(employeeId);
//        parcel.setReceivedByEmployeeName(employeeName);
//        parcel.setCurrentHub(currentHub);
//
//        return parcelRepository.save(parcel);
//    }




    public List<ParcelResponseDTO> getAllParcelResponseDTOS() {
        List<Parcel> parcels = parcelRepository.findAll();
        List<ParcelResponseDTO> dtoList = parcels.stream().map(e -> new ParcelResponseDTO(
                e.getId(),
                e.getTrackingId(),
                e.getSenderName(),
                e.getSenderPhone(),
                e.getReceiverName(),



                e.getC.getDesignationTitle(),
                e.getDesignation().getDepartment().getName()
        )).toList();

        return dtoList;
    }






}