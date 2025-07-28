import { Component } from '@angular/core';
import { HubTransfer } from '../../model/transferHub.model';
import { TransferHubService } from '../service/transfer-hub.service';
import { Parcel } from '../../model/parcel.model';
import { ParcelService } from '../service/parcel.service';
import { RecParcelEmpDetService } from '../service/rec-parcel-emp-det.service';
import { RecParcelEmpDetModel } from '../../model/recParcelByEmpDet.modek';

@Component({
  selector: 'app-track-parcel',
  standalone: false,
  templateUrl: './track-parcel.html',
  styleUrl: './track-parcel.css'
})
export class TrackParcel {
  
 trackingId = '';
  recParcelByEMp: RecParcelEmpDetModel | null = null;
  errorMessage = '';

  constructor(private recParcelEmpDetService: RecParcelEmpDetService
    
  ) {}

  track() {
    if (!this.trackingId) {
      this.errorMessage = 'Please enter a tracking ID.';
      return;
    }

    this.recParcelEmpDetService.getByTrackingId(this.trackingId).subscribe({
      next: (res: any) => {
        if (res.length > 0) {
          this.recParcelByEMp = res[0]; // Since you used `?trackingId=`, backend returns array
          this.errorMessage = '';
          console.log(this.recParcelByEMp);
        } else {
          this.recParcelByEMp = null;
          this.errorMessage = 'No parcel found with that tracking ID.';
        }
      },
      error: () => {
        this.recParcelByEMp = null;
        this.errorMessage = 'Error fetching parcel.';
      }
    });
  }
}