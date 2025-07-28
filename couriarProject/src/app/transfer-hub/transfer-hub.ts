import { Component, Injectable, OnInit } from '@angular/core';
import { HubTransfer } from '../../model/transferHub.model';
import { TransferHubService } from '../service/transfer-hub.service';
import { RecParcelEmpDetService } from '../service/rec-parcel-emp-det.service';
import { RecParcelEmpDetModel } from '../../model/recParcelByEmpDet.modek';
import { HubService } from '../service/hub.service';
import { Hub } from '../../model/hub.model';

@Component({
  selector: 'app-transfer-hub',
  standalone: false,
  templateUrl: './transfer-hub.html',
  styleUrl: './transfer-hub.css'
})


export class TransferHub implements OnInit {

  hubs: Hub[] = [];

  latestHubTransfer: HubTransfer | null = null;
  recParcel: RecParcelEmpDetModel = new RecParcelEmpDetModel();

  transfer: HubTransfer = {
    id: '',
    parcelId: '',
    fromHub: '',
    toHub: '',
    departedAt: '',
    currentHub: '',
    courierBy: ''
  };

  constructor(
    private hubTransferService: TransferHubService,
    private recParcelByEmp: RecParcelEmpDetService,
    private hubService: HubService
  ) { }

  ngOnInit(): void {
    this.loadAllHubs();
  }

  loadAllHubs(): void {
    this.hubService.getAllHubs().subscribe(data => {
      this.hubs = data;
    });
  }




  onChange(parcelId: string) {
    if (!parcelId) return;

    this.recParcelByEmp.getReceivedParcelById(parcelId).subscribe(data => {
      if (data) {
        this.recParcel = data;
        this.transfer.parcelId = data.parcelId;
        this.transfer.fromHub = data.currentHub;
      } else {
        alert('Parcel not found.');
        this.resetTransfer();
      }
    });

    this.hubTransferService.getLatestHub(parcelId).subscribe({
      next: data => this.latestHubTransfer = data,
      error: () => this.latestHubTransfer = null
    });
  }

  getCurrentHubByParcelId(parcelId: string) {
    this.recParcelByEmp.getReceivedParcelById(parcelId).subscribe(data => {
      this.recParcel = data;
    });
  }

  loadLatestHub(parcelId: string): void {
    this.hubTransferService.getLatestHub(parcelId).subscribe(data => {
      this.latestHubTransfer = data;
      this.transfer.fromHub = data.currentHub;
    });
  }

  isSubmitting = false;

  submitTransfer() {
    if (!this.transfer.parcelId || !this.transfer.fromHub || !this.transfer.toHub || !this.transfer.courierBy) {
      alert('Please fill all required fields');
      return;
    }

    this.isSubmitting = true;
    this.transfer.departedAt = new Date().toISOString();
    this.transfer.currentHub = this.transfer.toHub;

    this.hubTransferService.saveTransfer(this.transfer).subscribe({
      next: () => {
        this.hubTransferService.updateParcelCurrentHub(this.transfer.parcelId, this.transfer.toHub).subscribe({
          next: () => {
            alert('Parcel transferred and updated successfully!');
            this.loadLatestHub(this.transfer.parcelId);
            this.resetTransfer();
            this.isSubmitting = false;
          },
          error: (err) => {
            console.error('Error updating parcel current hub:', err);
            alert('Failed to update parcel current hub');
            this.isSubmitting = false;
          }
        });
      },
      error: (err) => {
        console.error('Error saving transfer:', err);
        alert('Failed to save transfer');
        this.isSubmitting = false;
      }
    });
  }


  resetTransfer() {
    this.transfer = {
      id: '',
      parcelId: '',
      fromHub: '',
      toHub: '',
      departedAt: '',
      currentHub: '',
      courierBy: ''
    };
    this.latestHubTransfer = null;
    this.recParcel = new RecParcelEmpDetModel(); // optionally reset parcel info as well
  }




}