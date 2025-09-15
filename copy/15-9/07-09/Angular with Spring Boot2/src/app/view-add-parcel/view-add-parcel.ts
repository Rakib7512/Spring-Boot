import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParcelService } from '../service/parcel.service';
import { Parcel } from '../../model/parcel.model';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-view-add-parcel',
  standalone: false,
  templateUrl: './view-add-parcel.html',
  styleUrl: './view-add-parcel.css'
})
export class ViewAddParcel implements OnInit {
  parcels: any[] = [];
  trackingId: string = "";  // ✅ search input এর জন্য

  constructor(private parcelService: ParcelService) {}

  ngOnInit(): void {
    this.loadParcels();
  }

  // ✅ Load all parcels initially
  loadParcels() {
    this.parcelService.getAllParcels().subscribe({
      next: (data) => {
        this.parcels = data;
      },
      error: (err) => {
        console.error("Error loading parcels", err);
      }
    });
  }

  // ✅ Search by trackingId
  searchParcel() {
    if (this.trackingId.trim() === "") {
      this.loadParcels(); // যদি খালি থাকে তবে সব দেখাবে
    } else {
      this.parcelService.getParcelByTrackingId(this.trackingId).subscribe({
        next: (data) => {
          this.parcels = [data]; // ✅ একটাই object, তাই array বানিয়ে দিচ্ছি
        },
        error: (err) => {
          console.error("Parcel not found", err);
          this.parcels = [];
        }
      });
    }
  }
}