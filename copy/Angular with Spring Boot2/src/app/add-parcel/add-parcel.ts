import {
  ChangeDetectorRef,
  Component,
  Injectable,
  OnInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

import { Parcel } from '../../model/parcel.model';
import { ParcelService } from '../service/parcel.service';
import { CountryService } from '../service/country.service';
import { DivisionService } from '../service/division.service';
import { DistrictService } from '../service/district.service';
import { PoliceStationService } from '../service/police-station.service';
import { StorageService } from '../service/storage-service';
import { AddressService } from '../service/address.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-add-parcel',
  standalone: false,
  templateUrl: './add-parcel.html',
  styleUrl: './add-parcel.css'
})
@Injectable({ providedIn: 'root' })
export class AddParcel implements OnInit {

  trackingId: string = '';
  size: string = '';
  fee: number = 0;
  paymentMethod: string = '';
  confirmationCode: string = '';
  enteredConfirmationCode: string = '';

  senderName: string = '';
  senderPhone: string = '';
  addressLineForSender1: string = '';
  addressLineForSender2: string = '';
  selectedSendCountry: number = 0;
  selectedSendDivision: number = 0;
  selectedSendDistrict: number = 0;
  selectedSendPoliceStation: number = 0;

  receiverName: string = '';
  receiverPhone: string = '';
  addressLineForReceiver1: string = '';
  addressLineForReceiver2: string = '';
  selectedReceiveCountry: number = 0;
  selectedReceiveDivision: number = 0;
  selectedReceiveDistrict: number = 0;
  selectedReceivePoliceStation: number = 0;

  countries: any[] = [];
  divisions: any[] = [];
  districts: any[] = [];
  policeStations: any[] = [];

  receiverCountries: any[] = [];
  receiverDivisions: any[] = [];
  receiverDistricts: any[] = [];
  receiverPoliceStations: any[] = [];

  paymentInfo: string = '';
  parcelForm!: FormGroup;
  showPaymentSection: boolean = false;
  paymentSuccess: boolean = false;
  verificationCode: string = '';
  isPaymentDone = false;
  enteredCode: string = '';
  showCodeInput = false;
  finalSubmitAllowed = false;

  constructor(
    private addressService: AddressService,
    private fb: FormBuilder,
    private countryService: CountryService,
    private divisionService: DivisionService,
    private districtService: DistrictService,
    private policeStationService: PoliceStationService,
    private parcelService: ParcelService,
    private router: Router,
    private storageService: StorageService,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadSenderCountries();
    this.loadReceiverCountries();
  }

  calculateParcelFee(): void {
    let baseFee = 0;

    switch (this.size) {
      case 'SMALL': baseFee = 100; break;
      case 'MEDIUM': baseFee = 300; break;
      case 'LARGE': baseFee = 500; break;
      case 'EXTRA_LARGE': baseFee = 800; break;
      default: baseFee = 0;
    }

    if (this.selectedSendCountry !== this.selectedReceiveCountry) {
      this.fee = baseFee + 100;
    } else if (this.selectedSendDivision !== this.selectedReceiveDivision) {
      this.fee = baseFee + 50;
    } else {
      this.fee = baseFee;
    }

    this.showPaymentSection = this.fee > 0;
  }

  updatePaymentDetails(): void {
    const method = this.parcelForm?.get('paymentMethod')?.value;
    if (method === 'bkash') {
      this.paymentInfo = 'Send money to Bkash: 01666666666';
    } else if (method === 'nagad') {
      this.paymentInfo = 'Send money to Nagad: 01555555555';
    } else if (method === 'bank') {
      this.paymentInfo = 'Bank Account: 75877587 (ABC Bank)';
    } else {
      this.paymentInfo = '';
    }
  }

  submitParcel() {
    const parcelData = {
      senderName: this.senderName,
      senderPhone: this.senderPhone,
      trackingId: uuidv4(),
      addressLineForSender1: this.addressLineForSender1,
      addressLineForSender2: this.addressLineForSender2,
      sendCountry: { id: this.selectedSendCountry },
      sendDivision: { id: this.selectedSendDivision },
      sendDistrict: { id: this.selectedSendDistrict },
      sendPoliceStation: { id: this.selectedSendPoliceStation },
      receiverName: this.receiverName,
      receiverPhone: this.receiverPhone,
      addressLineForReceiver1: this.addressLineForReceiver1,
      addressLineForReceiver2: this.addressLineForReceiver2,
      receiveCountry: { id: this.selectedReceiveCountry },
      receiveDivision: { id: this.selectedReceiveDivision },
      receiveDistrict: { id: this.selectedReceiveDistrict },
      receivePoliceStation: { id: this.selectedReceivePoliceStation },
      size: this.size,
      fee: this.fee,
    };

    this.parcelService.saveParcel(parcelData).subscribe({
      next: (data) => {
        alert('Parcel created successfully!');
        this.saveToLocalNotification(data);
      },
      error: (err) => {
        console.error(err);
        alert('Error saving parcel.');
      }
    });
  }

  onSubmitParcel() {
    const parcel: Parcel = { ...this.parcelForm.value };
    parcel.trackingId = uuidv4();

    this.parcelService.saveParcel(parcel).subscribe(
      (savedParcel) => {
        this.saveToLocalNotification(savedParcel);
        alert('Parcel created successfully!');
        this.parcelForm.reset();
        this.router.navigate(['/viewparcel']);
      },
      (error) => {
        console.error(error);
        alert('Failed to create parcel.');
      }
    );
  }

  saveToLocalNotification(parcel: any) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem('parcelNotifications');
        let notifications = [];

        if (raw) {
          notifications = JSON.parse(raw);
        }

        notifications.push({
          message: `📦 New Parcel: ${parcel.senderName} ➔ ${parcel.receiverName}`,
          parcelTrackingId: parcel.trackingId,
          parcelId: parcel.id,
          time: new Date().toLocaleString()
        });

        localStorage.setItem('parcelNotifications', JSON.stringify(notifications));
      }
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  }

  // Sender dropdown loading
  loadSenderCountries() {
    this.addressService.getCountries().subscribe(data => {
      this.countries = data;
      this.cdr.markForCheck();
    });
  }

  onSendCountryChange() {
    this.divisions = [];
    this.districts = [];
    this.policeStations = [];
    this.selectedSendDivision = 0;
    this.selectedSendDistrict = 0;
    this.selectedSendPoliceStation = 0;

    if (this.selectedSendCountry) {
      this.addressService.getDivisionsByCountry(this.selectedSendCountry)
        .subscribe(data => this.divisions = data);
    }
  }

  onSendDivisionChange() {
    this.districts = [];
    this.policeStations = [];
    this.selectedSendDistrict = 0;
    this.selectedSendPoliceStation = 0;

    if (this.selectedSendDivision) {
      this.addressService.getDistrictsByDivision(this.selectedSendDivision)
        .subscribe(data => this.districts = data);
    }
  }

  onSendDistrictChange() {
    this.policeStations = [];
    this.selectedSendPoliceStation = 0;

    if (this.selectedSendDistrict) {
      this.addressService.getPoliceStationsByDistrict(this.selectedSendDistrict)
        .subscribe(data => this.policeStations = data);
    }
  }

  // Receiver dropdown loading
  loadReceiverCountries() {
    this.addressService.getCountries().subscribe(data => {
      this.receiverCountries = data;
    });
  }

  onReceiveCountryChange() {
    this.receiverDivisions = [];
    this.receiverDistricts = [];
    this.receiverPoliceStations = [];
    this.selectedReceiveDivision = 0;
    this.selectedReceiveDistrict = 0;
    this.selectedReceivePoliceStation = 0;

    if (this.selectedReceiveCountry) {
      this.addressService.getDivisionsByCountry(this.selectedReceiveCountry)
        .subscribe(data => this.receiverDivisions = data);
    }
  }

  onReceiveDivisionChange() {
    this.receiverDistricts = [];
    this.receiverPoliceStations = [];
    this.selectedReceiveDistrict = 0;
    this.selectedReceivePoliceStation = 0;

    if (this.selectedReceiveDivision) {
      this.addressService.getDistrictsByDivision(this.selectedReceiveDivision)
        .subscribe(data => this.receiverDistricts = data);
    }
  }

  onReceiveDistrictChange() {
    this.receiverPoliceStations = [];
    this.selectedReceivePoliceStation = 0;

    if (this.selectedReceiveDistrict) {
      this.addressService.getPoliceStationsByDistrict(this.selectedReceiveDistrict)
        .subscribe(data => this.receiverPoliceStations = data);
    }
  }

  generateConfirmationCode(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  onPaymentSuccess() {
    this.confirmationCode = this.generateConfirmationCode();
    this.paymentSuccess = true;
  }

  startPayment() {
    if (!this.parcelForm.value.fee || !this.parcelForm.value.paymentMethod) {
      alert("Please calculate fee and select a payment method.");
      return;
    }

    const generatedTrackingId = uuidv4();
    this.parcelForm.patchValue({ trackingId: generatedTrackingId });

    this.verificationCode = this.generateConfirmationCode();
    this.confirmationCode = this.verificationCode;
    this.paymentSuccess = true;

    alert(`✅ Please send payment using Tracking ID: ${generatedTrackingId}`);
  }
}
