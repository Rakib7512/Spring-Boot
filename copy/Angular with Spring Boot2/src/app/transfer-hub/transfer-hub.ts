import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransferHubService } from '../service/transfer-hub.service';
import { PoliceStationService } from '../service/police-station.service';
import { PoliceStation } from '../../model/policeStation.model';
import { ParcelService } from '../service/parcel.service';
import { Parcel } from '../../model/parcel.model';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-transfer-hub',
  standalone: false,
  templateUrl: './transfer-hub.html',
  styleUrls: ['./transfer-hub.css'],
})
export class TransferHub implements OnInit {
  id!: string;
  transferForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  allHub: PoliceStation[] = [];
  previousHubModel?: PoliceStation;
  currentHubModel?: PoliceStation;

  constructor(
    private fb: FormBuilder,
    private transferHubService: TransferHubService,
    private parcelService: ParcelService,
    private ps: PoliceStationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.transferForm = this.fb.group({
      trackingId: ['', Validators.required],
      previousHub: [{ value: '', disabled: true }],
      currentHub: [{ value: '', disabled: true }],
      toHub: ['', Validators.required],
      employeeId: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.loadAllHub();


    // ✅ Safe localStorage access
    if (isPlatformBrowser(this.platformId)) {
      const empId = localStorage.getItem('employeeId');
      if (empId) {
        this.transferForm.patchValue({
          employeeId: +empId   // convert to number
        });
      }
    }

  }

  loadAllHub(): void {
    this.ps.getAll().subscribe({
      next: (data) => {
        this.allHub = data;
        this.transferForm.get('trackingId')?.enable();
      },
      error: (err) => {
        console.error('Error loading hubs:', err);
        this.errorMessage = 'Failed to load hubs. Please try again.';
      },
    });
  }

  onTrackingIdChange(): void {
    const trackingId = this.transferForm.get('trackingId')?.value;

    if (!trackingId || this.allHub.length === 0) return;

    this.transferHubService.getParcelDetailsForTransfer(trackingId).subscribe({
      next: (parcelDetails) => {
        if (!parcelDetails || parcelDetails.length === 0) {
          this.errorMessage = 'No parcel found with the provided tracking ID.';
          return;
        }

        const parcel = parcelDetails[0];
        console.log('Parcel Details:', parcel);

        this.id = parcel.id;

        this.previousHubModel = this.allHub.find(h => String(h.id) === String(parcel.previousHub));
        this.currentHubModel = this.allHub.find(h => String(h.id) === String(parcel.currentHub));
console.log(this.previousHubModel+"   pppppppppppppppppp");

        const previousHub = this.previousHubModel?.name || 'Unknown Hub';
        const currentHub = this.currentHubModel?.name || 'Unknown Hub';



        this.transferForm.patchValue({
          previousHub: previousHub,
          currentHub: currentHub,
        });

        this.errorMessage = '';
      },
      error: (err) => {
        console.error('API Error:', err);
        this.errorMessage = 'Failed to load parcel details. Please try again!';
      },
    });
  }

  onSubmit(): void {
    if (this.transferForm.invalid) return;

    const { trackingId, toHub, employeeId } = this.transferForm.getRawValue();

    this.transferHubService.transferParcel(trackingId, toHub, employeeId).subscribe({
      next: (message) => {
        // After successful transfer, update the parcel's hub values
        this.parcelService.getParcelById(this.id).subscribe({
          next: (parcel) => {
            const updatedParcel: Parcel = {
              ...parcel,
              previousHub: parcel.currentHub, // current becomes from
              currentHub: toHub,          // to becomes current
            };

            this.parcelService.updateParcel(updatedParcel).subscribe({
              next: (updated) => {
                this.successMessage = 'Parcel successfully transferred and updated.';
                this.errorMessage = '';
                this.transferForm.reset();
                this.transferForm.get('previousHub')?.disable();
                this.transferForm.get('currentHub')?.disable();
              },
              error: (err) => {
                console.error('Parcel update failed:', err);
                this.errorMessage = 'Transfer succeeded, but updating parcel hubs failed.';
                this.successMessage = '';
              },
            });
          },
          error: (err) => {
            console.error('Failed to fetch parcel by ID:', err);
            this.errorMessage = 'Transfer succeeded, but fetching parcel failed.';
            this.successMessage = '';
          },
        });
      },
      error: (err) => {
        console.error('Transfer error:', err);
        this.errorMessage = 'Error transferring parcel. Please try again!';
        this.successMessage = '';
      },
    });
  }
}
