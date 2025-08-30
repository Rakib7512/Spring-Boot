import { Component, OnInit } from '@angular/core';
import { TransferHubService } from '../service/transfer-hub.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoliceStationService } from '../service/police-station.service';
import { PoliceStation } from '../../model/policeStation.model';

@Component({
  selector: 'app-transfer-hub',
  standalone: false,
  templateUrl: './transfer-hub.html',
  styleUrls: ['./transfer-hub.css'],
})
export class TransferHub implements OnInit {
  transferForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  fromHub: string = '';
  employeeCurrentHub: string = '';
  allHub: PoliceStation[] = [];  // Initialize as empty array
  selectedHub!: PoliceStation | undefined;

  constructor(
    private fb: FormBuilder,
    private transferHubService: TransferHubService,
    private ps: PoliceStationService
  ) {
    this.transferForm = this.fb.group({
      trackingId: ['', Validators.required],
      hubName: ['', Validators.required],
      employeeId: ['', [Validators.required, Validators.min(1)]],
      fromHub: [{ value: '', disabled: true }],
      employeeCurrentHub: [{ value: '', disabled: true }],
    });
  }

  ngOnInit(): void {
    this.loadAllHub();
  }

  loadAllHub(): void {
    this.ps.getAll().subscribe({
      next: (data) => {
        this.allHub = data;
        console.log('Loaded Hubs:', this.allHub); // Log hubs to check data
        this.transferForm.get('trackingId')?.enable();  // Enable tracking ID field once hubs are loaded
      },
      error: (err) => {
        console.error('Error loading hubs:', err);
        this.errorMessage = 'Failed to load hubs. Please try again.';
      },
    });
  }

  onTrackingIdChange(): void {
    const trackingId = this.transferForm.get('trackingId')?.value;
    console.log('Tracking ID:', trackingId);

    if (trackingId && this.allHub.length > 0) {
      this.transferHubService.getParcelDetails(trackingId).subscribe({
        next: (parcelDetails) => {
          console.log('Parcel details:', parcelDetails); // Log parcel details

          if (parcelDetails && parcelDetails.length > 0) {
            const parcel = parcelDetails[0];

            console.log('Parcel currentHub:', parcel.currentHub);  // Log currentHub value
            console.log('All Hub IDs:', this.allHub.map((h) => h.id));  // Log IDs of all hubs

            // Ensure both currentHub and hub IDs are compared as strings
            this.selectedHub = this.allHub.find(
              (ah) => String(ah.id) === String(parcel.currentHub)
            );

            console.log('Selected Hub:', this.selectedHub);  // Log the selected hub after lookup

            if (this.selectedHub) {
              this.fromHub = this.selectedHub.name || 'No current hub';
            } else {
              this.fromHub = 'No matching hub found';
            }

            this.employeeCurrentHub = parcel.currentHub || 'No hub available';

            // Patch the values into the form
            this.transferForm.patchValue({
              fromHub: this.fromHub,
              employeeCurrentHub: this.employeeCurrentHub,
              hubName: this.selectedHub?.name || '', // Patch the hubName field
            });
          } else {
            this.errorMessage = 'No parcel found with the provided tracking ID.';
          }
        },
        error: (err) => {
          console.error('API Error:', err);
          this.errorMessage = 'Failed to load parcel details. Please try again!';
        },
      });
    } else {
      console.log('Tracking ID not entered or hubs not available');
    }
  }

  onSubmit(): void {
    if (this.transferForm.invalid) {
      return;
    }

    const { trackingId, hubName, employeeId } = this.transferForm.value;

    this.transferHubService.transferParcel(trackingId, hubName, employeeId).subscribe({
      next: (message) => {
        this.successMessage = message;
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = 'Error transferring parcel. Please try again!';
        this.successMessage = '';
      },
    });
  }
}
