import { ChangeDetectorRef, Component } from '@angular/core';
import { HubTransfer } from '../../model/transferHub.model';
import { TransferHubService } from '../service/transfer-hub.service';
import { Parcel } from '../../model/parcel.model';
import { ParcelService } from '../service/parcel.service';
import { RecParcelEmpDetService } from '../service/rec-parcel-emp-det.service';
import { RecParcelEmpDetModel } from '../../model/recParcelByEmpDet.modek';
import { ParcelTrackingDTO } from '../../model/parcelTrackingDTO';

@Component({
  selector: 'app-track-parcel',
  standalone: false,
  templateUrl: './track-parcel.html',
  styleUrl: './track-parcel.css'
})
export class TrackParcel {

  trackingList: ParcelTrackingDTO[] = [];
  errorMessage: string = '';

  trackingId: string = ''; // Bind to input

  constructor(private parcelService: ParcelService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void { }

  loadTracking(trackingId: string): void {
  if (!trackingId) {
    this.errorMessage = 'Please enter a tracking number';
    return;
  }

  this.parcelService.getParcelTracking(trackingId).subscribe({
    next: (data) => {
      this.trackingList = data;
      this.errorMessage = '';
    },
    error: (err) => {
      this.errorMessage = 'Parcel not found or failed to load';
      this.trackingList = [];
    }
  });
}

}