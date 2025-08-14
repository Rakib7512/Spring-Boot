package com.rakib.project.service;

import com.rakib.project.entity.Parcel;
import com.rakib.project.entity.ParcelTracking;
import com.rakib.project.repository.IParcelRepository;
import com.rakib.project.repository.IParcelTrackingRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ParcelService {
    private final IParcelRepository parcelRepository;
    private final IParcelTrackingRepository trackingRepository;

    public ParcelService(IParcelRepository parcelRepository,
                         IParcelTrackingRepository trackingRepository) {
        this.parcelRepository = parcelRepository;
        this.trackingRepository = trackingRepository;
    }

    @Transactional
    public Parcel saveParcel(Parcel parcel) {
        if (parcel.getTrackingHistory() != null) {
            for (ParcelTracking t : parcel.getTrackingHistory()) {
                t.setParcel(parcel);
            }
        }
        return parcelRepository.save(parcel);
    }

    public List<Parcel> getAllParcels() {
        return parcelRepository.findAll();
    }

    public Parcel getParcelById(Long id) {
        return parcelRepository.findById(id).orElse(null);
    }

    public Parcel getParcelByTrackingId(String trackingId) {
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

        // because of transactional context and owning side set, no extra save required,
        // but to be safe (and to update any derived fields) you may save parcel:
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

        // remove from parcel list (if present)
        if (parcel.getTrackingHistory() != null) {
            parcel.getTrackingHistory().removeIf(x -> x.getId().equals(trackingId));
            parcelRepository.save(parcel);
        }

        // delete tracking record
        trackingRepository.deleteById(trackingId);
    }
}