import { ChangeDetectorRef, Component } from '@angular/core';
import { HubTransfer } from '../../model/transferHub.model';
import { TransferHubService } from '../service/transfer-hub.service';
import { Parcel } from '../../model/parcel.model';
import { ParcelService } from '../service/parcel.service';
import { RecParcelEmpDetService } from '../service/rec-parcel-emp-det.service';
import { RecParcelEmpDetModel } from '../../model/recParcelByEmpDet.modek';
import { ParcelTrackingDTO } from '../../model/parcelTrackingDTO';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-track-parcel',
  standalone: false,
  templateUrl: './track-parcel.html',
  styleUrl: './track-parcel.css'
})
export class TrackParcel {

  trackingList: ParcelTrackingDTO[] = [];
  errorMessage: string = '';

  id: string = ''; // From route
  trackingId: string = ''; // From form input
  hasRouteId: boolean = false;

  constructor(
    private parcelService: ParcelService,
    private ar: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.ar.paramMap.subscribe(params => {
      const routeId = params.get('id');
      if (routeId) {
        this.id = routeId;
        this.hasRouteId = true;
        this.loadTracking(this.id);
      } else {
        this.hasRouteId = false;
      }
    });
  }

  loadTracking(idToTrack: string = ''): void {
    const id = idToTrack || this.trackingId;

    if (!id || id.trim() === '') {
      this.errorMessage = 'Please enter a valid tracking number.';
      this.trackingList = [];
      return;
    }

    this.parcelService.getParcelTracking(id.trim()).subscribe({
      next: (data) => {
        this.trackingList = data;
        this.errorMessage = '';
        this.cd.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Parcel not found or failed to load.';
        this.trackingList = [];
        this.cd.detectChanges();
      }
    });
  }

}