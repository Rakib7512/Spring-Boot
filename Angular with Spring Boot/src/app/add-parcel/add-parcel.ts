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

  // General
  trackingId: string = '';
  currentHub: string = '';
  bookingAgent: string = '';
  deliveryPerson: string = '';
  weight: number = 0;
  squareFeet: number = 0;
  fee: number = 0;
  paymentMethod: string = '';
  confirmationCode: string = '';
  enteredConfirmationCode: string = '';

  // Sender Info
  senderName: string = '';
  senderPhone: string = '';
  addressLineForSender1: string = '';
  addressLineForSender2: string = '';
  selectedSendCountry: number = 0;
  selectedSendDivision: number = 0;
  selectedSendDistrict: number = 0;
  selectedSendPoliceStation: number = 0;

  // Receiver Info
  receiverName: string = '';
  receiverPhone: string = '';
  addressLineForReceiver1: string = '';
  addressLineForReceiver2: string = '';
  selectedReceiveCountry: number = 0;
  selectedReceiveDivision: number = 0;
  selectedReceiveDistrict: number = 0;
  selectedReceivePoliceStation: number = 0;

  // Dropdown Lists
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
    private cdr: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {

    this.loadSenderCountries();
    this.loadReceiverCountries();

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


  submitParcel() {
    const parcelData = {
      senderName: this.senderName,
      senderPhone: this.senderPhone,
      addressLineForSender1: this.addressLineForSender1,
      addressLineForSender2: this.addressLineForSender2,

      sendCountry: {id: this.selectedSendCountry},
      sendDivision: {id: this.selectedSendDivision},
      sendDistrict: {id: this.selectedSendDistrict},
      sendPoliceStation: {id: this.selectedSendPoliceStation},

      receiverName: this.receiverName,
      receiverPhone: this.receiverPhone,
      addressLineForReceiver1: this.addressLineForReceiver1,
      addressLineForReceiver2: this.addressLineForReceiver2,
      receiveCountry: {id: this.selectedReceiveCountry},
      receiveDivision:{id:  this.selectedReceiveDivision},
      receiveDistrict: {id: this.selectedReceiveDistrict},
      receivePoliceStation:{id:  this.selectedReceivePoliceStation},

      weight: this.weight,
      squareFeet: this.squareFeet,
      fee: this.fee,
      paymentMethod: this.paymentMethod,
      enteredConfirmationCode: this.enteredConfirmationCode
    };

    this.parcelService.saveParcel(parcelData).subscribe({

      next: (data)=>{
          console.log(data);
      }
    });
  }


    onSubmitParcel() {
      // if (!this.parcelForm.value.fee || !this.parcelForm.value.paymentMethod) {
      //   alert("Please calculate fee and select a payment method.");
      //   return;
      // }

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



    // Sender dropdown loading
    loadSenderCountries() {
      this.addressService.getCountries().subscribe(data => {
        this.countries = data; this.cdr.markForCheck();
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

      this.addressService.getCountries().subscribe(data =>{ 
        this.receiverCountries = data});
    }

    

    onReceiveCountryChange() {
      this.receiverDivisions = [];
      this.receiverDistricts = [];
      this.receiverPoliceStations = [];
      this.selectedReceiveDivision = 0;
      this.selectedReceiveDistrict = 0;
      this.selectedReceivePoliceStation = 0;

      console.log(this.selectedReceiveCountry+"*********************************")
      if (this.selectedReceiveCountry) {
        this.addressService.getDivisionsByCountry(this.selectedReceiveCountry)
          .subscribe(data => {this.receiverDivisions = data,
            console.log(data);}
          );
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
