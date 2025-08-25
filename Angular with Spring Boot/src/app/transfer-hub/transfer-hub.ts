import { Component, Injectable, OnInit } from '@angular/core';
import { HubTransfer } from '../../model/transferHub.model';
import { TransferHubService } from '../service/transfer-hub.service';
import { RecParcelEmpDetService } from '../service/rec-parcel-emp-det.service';
import { RecParcelEmpDetModel } from '../../model/recParcelByEmpDet.modek';
import { HubService } from '../service/hub.service';
import { Hub } from '../../model/hub.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParcelService } from '../service/parcel.service';

@Component({
  selector: 'app-transfer-hub',
  standalone: false,
  templateUrl: './transfer-hub.html',
  styleUrl: './transfer-hub.css'
})


export class TransferHub  {
transferForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private parcelService: ParcelService,
    private fb: FormBuilder
  ) {
    this.transferForm = this.fb.group({
      trackingId: ['', Validators.required],
      hubName: ['', Validators.required],
      employeeId: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }

  onSubmit(): void {
    if (this.transferForm.invalid) return;

    const { trackingId, hubName, employeeId } = this.transferForm.value;

    this.parcelService.transferParcel(trackingId, hubName, employeeId).subscribe({
      next: () => {
        this.successMessage = 'Parcel transferred successfully!';
        this.errorMessage = '';
        this.transferForm.reset();
      },
      error: (err) => {
        this.errorMessage = 'Transfer failed: ' + (err.error?.message || 'Server error');
        this.successMessage = '';
      }
    });
  }
}