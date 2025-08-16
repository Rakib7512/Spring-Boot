import { ChangeDetectorRef, Component, Injectable, OnInit } from '@angular/core';
import { Parcel } from '../../model/parcel.model';
import { ParcelService } from '../service/parcel.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { Country } from '../../model/country.module';
import { Division } from '../../model/division.model';
import { District } from '../../model/district.model';
import { PoliceStation } from '../../model/policeStation.model';
import { CountryService } from '../service/country.service';
import { DivisionService } from '../service/division.service';
import { DistrictService } from '../service/district.service';
import { PoliceStationService } from '../service/police-station.service';
import { StorageService } from '../service/storage-service';
import { AddressService } from '../service/address.service';

@Component({
  selector: 'app-add-parcel',
  standalone: false,
  templateUrl: './add-parcel.html',
  styleUrl: './add-parcel.css'
})
@Injectable({
  providedIn: 'root'
})
export class AddParcel implements OnInit {

 countries: any[] = [];
  divisions: any[] = [];
  districts: any[] = [];
  policeStations: any[] = [];

  selectedCountry: number = 0;
  selectedDivision: number = 0;
  selectedDistrict: number = 0;
  selectedPoliceStation: number = 0;

  addressLine1: string = '';
  addressLine2: string = '';

  paymentInfo: string = '';
  parcelForm!: FormGroup;
  showPaymentSection: boolean = false;
  confirmationCode: string = '';
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
    private cdr:ChangeDetectorRef
  ) {
    this.parcelForm = this.fb.group({
      trackingId: [''],
      senderName: ['', Validators.required],
      senderPhone: ['', Validators.required],
      senderAddress: ['', Validators.required],
      sendCountry: ['', Validators.required],
      sendDivision: ['', Validators.required],
      sendDistrict: ['', Validators.required],
      sendPoliceStation: ['', Validators.required],
      receiverName: ['', Validators.required],
      receiverPhone: ['', Validators.required],
      receiverAddress: ['', Validators.required],
      receiveCountry: ['', Validators.required],
      receiveDivision: ['', Validators.required],
      receiveDistrict: ['', Validators.required],
      receivePoliceStation: ['', Validators.required],
      currentHub: ['', Validators.required],
      bookingAgent: ['', Validators.required],
      deliveryPerson: ['', Validators.required],
      weight: [0],
      squareFeet: [0],
      fee: [0],
      paymentMethod: ['', Validators.required],
      confirmationCode: ['', Validators.required],
      enteredConfirmationCode: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Set logged in user's name as senderName
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (loggedInUser) {
    const user = JSON.parse(loggedInUser);
    if (user?.name) {
      this.parcelForm.patchValue({ senderName: user.name });
      this.parcelForm.get('senderName')?.disable();
    }
  }
  this.loadCountries();



    this.calculateParcelFee()
    this.loadMasterData();
    this.parcelForm.get('weight')?.valueChanges.subscribe(() => this.calculateParcelFee());
    this.parcelForm.get('squareFeet')?.valueChanges.subscribe(() => this.calculateParcelFee());
    this.parcelForm.get('paymentMethod')?.valueChanges.subscribe(() => this.updatePaymentDetails());
  }
    loadCountries() {
    this.addressService.getCountries().subscribe(data => {
      this.countries = data;
    });
  }


  loadMasterData() {
    this.countryService.getAll().subscribe(data => this.countries = data);
    this.divisionService.getAll().subscribe(data => this.divisions = data);
    this.districtService.getAll().subscribe(data => this.districts = data);
    this.policeStationService.getAll().subscribe(data => this.policeStations = data);
  }

  calculateParcelFee(): void {
    const formValue = this.parcelForm.value;
    let baseFee = 60;
    let extraPerKg = 0;
    let extraPerSqft = 0;

    const sendCountry = formValue.sendCountry;
    const receiveCountry = formValue.receiveCountry;
    const sendDivision = formValue.sendDivision;
    const receiveDivision = formValue.receiveDivision;
    const sendDistrict = formValue.sendDistrict;
    const receiveDistrict = formValue.receiveDistrict;

    if (sendCountry !== receiveCountry) {
      extraPerKg = 200;
      extraPerSqft = 150;
    } else if (sendDivision !== receiveDivision) {
      extraPerKg = 100;
      extraPerSqft = 70;
    } else if (sendDistrict !== receiveDistrict) {
      extraPerKg = 70;
      extraPerSqft = 50;
    } else {
      extraPerKg = 50;
      extraPerSqft = 40;
    }

    let weightFee = baseFee;
    let squareFeetFee = baseFee;

    if (formValue.weight && formValue.weight > 0) {
      if (formValue.weight > 1) {
        weightFee += (formValue.weight - 1) * extraPerKg;
      }
    } else {
      weightFee = 0;
    }

    if (formValue.squareFeet && formValue.squareFeet > 0) {
      if (formValue.squareFeet > 1) {
        squareFeetFee += (formValue.squareFeet - 1) * extraPerSqft;
      }
    } else {
      squareFeetFee = 0;
    }

    const finalFee = Math.max(weightFee, squareFeetFee);
    this.parcelForm.patchValue({ fee: finalFee });
    this.showPaymentSection = finalFee > 0;
  }

  updatePaymentDetails(): void {
    const method = this.parcelForm.get('paymentMethod')?.value;

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

  onSubmitParcel() {
    if (!this.parcelForm.value.fee || !this.parcelForm.value.paymentMethod) {
      alert("Please calculate fee and select a payment method.");
      return;
    }

    const parcel: Parcel = { ...this.parcelForm.value };
    parcel.trackingId = uuidv4();

    this.parcelService.saveParcel(parcel).subscribe(
      (savedParcel) => {
        if (typeof window !== 'undefined' && window.localStorage) {
          const notifications = JSON.parse(localStorage.getItem('parcelNotifications') || '[]');

          notifications.push({
            message: `📦 New Parcel: ${savedParcel.senderName} ➔ ${savedParcel.receiverName}`,
            parcelTrackingId: savedParcel.trackingId,
            parcelId: savedParcel.id,
            time: new Date().toLocaleString()
          });

          localStorage.setItem('parcelNotifications', JSON.stringify(notifications));
        }

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

 

// Sender
 onCountryChangeForSender() {
    this.divisions = [];
    this.districts = [];
    this.policeStations = [];
    this.selectedDivision = 0;
    this.selectedDistrict = 0;
    this.selectedPoliceStation = 0;

    if (this.selectedCountry) {
      this.addressService.getDivisionsByCountry(this.selectedCountry).subscribe(data => {
        this.divisions = data;
        this.cdr.markForCheck();
      });
    }
  }

  onDivisionChangeForSender() {
    this.districts = [];
    this.policeStations = [];
    this.selectedDistrict = 0;
    this.selectedPoliceStation = 0;

    if (this.selectedDivision) {
      this.addressService.getDistrictsByDivision(this.selectedDivision).subscribe(data => {
        this.districts = data;
        this.cdr.markForCheck();
      });
    }
  }

  onDistrictChangeForSender() {
    this.policeStations = [];
    this.selectedPoliceStation = 0;

    if (this.selectedDistrict) {
      this.addressService.getPoliceStationsByDistrict(this.selectedDistrict).subscribe(data => {
        this.policeStations = data;
        this.cdr.markForCheck();
      });
    }
  }

// Receiver
 onCountryChangeForReceiver() {
    this.divisions = [];
    this.districts = [];
    this.policeStations = [];
    this.selectedDivision = 0;
    this.selectedDistrict = 0;
    this.selectedPoliceStation = 0;

    if (this.selectedCountry) {
      this.addressService.getDivisionsByCountry(this.selectedCountry).subscribe(data => {
        this.divisions = data;
        this.cdr.markForCheck();
      });
    }
  }

  onDivisionChangeForReceiver() {
    this.districts = [];
    this.policeStations = [];
    this.selectedDistrict = 0;
    this.selectedPoliceStation = 0;

    if (this.selectedDivision) {
      this.addressService.getDistrictsByDivision(this.selectedDivision).subscribe(data => {
        this.districts = data;
        this.cdr.markForCheck();
      });
    }
  }

  onDistrictChangeReceiver() {
    this.policeStations = [];
    this.selectedPoliceStation = 0;

    if (this.selectedDistrict) {
      this.addressService.getPoliceStationsByDistrict(this.selectedDistrict).subscribe(data => {
        this.policeStations = data;
        this.cdr.markForCheck();
      });
    }
  }


  generateConfirmationCode(): string {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    return code;
  }

  onPaymentSuccess() {
    this.confirmationCode = this.generateConfirmationCode();
    this.paymentSuccess = true;
  }
  startPayment() {
  // Validate fee and payment method
  if (!this.parcelForm.value.fee || !this.parcelForm.value.paymentMethod) {
    alert("Please calculate fee and select a payment method.");
    return;
  }

  // Generate trackingId before payment
  const generatedTrackingId = uuidv4();
  this.parcelForm.patchValue({ trackingId: generatedTrackingId });

  // Show payment instructions including trackingId
  this.verificationCode = this.generateConfirmationCode();
  this.confirmationCode = this.verificationCode;
  this.paymentSuccess = true;

  alert(`✅ Please send payment using Tracking ID: ${generatedTrackingId}`);
  
}


  

}
