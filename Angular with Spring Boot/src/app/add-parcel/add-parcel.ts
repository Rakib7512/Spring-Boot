import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-add-parcel',
  standalone: false,
  templateUrl: './add-parcel.html',
  styleUrl: './add-parcel.css'
})
export class AddParcel implements OnInit {
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

  countries: Country[] = [];
  divisions: Division[] = [];
  districts: District[] = [];
  policeStations: PoliceStation[] = [];

  filteredSenderDivisions: Division[] = [];
  filteredSenderDistricts: District[] = [];
  filteredSenderPoliceStations: PoliceStation[] = [];
  filteredReceiverDivisions: Division[] = [];
  filteredReceiverDistricts: District[] = [];
  filteredReceiverPoliceStations: PoliceStation[] = [];

  constructor(
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



    this.calculateParcelFee()
    this.loadMasterData();
    this.parcelForm.get('weight')?.valueChanges.subscribe(() => this.calculateParcelFee());
    this.parcelForm.get('squareFeet')?.valueChanges.subscribe(() => this.calculateParcelFee());
    this.parcelForm.get('paymentMethod')?.valueChanges.subscribe(() => this.updatePaymentDetails());
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
        this.clearFilters();
        this.router.navigate(['/viewparcel']);
      },
      (error) => {
        console.error(error);
        alert('Failed to create parcel.');
      }
    );
  }

  clearFilters() {
    this.filteredSenderDivisions = [];
    this.filteredSenderDistricts = [];
    this.filteredSenderPoliceStations = [];
    this.filteredReceiverDivisions = [];
    this.filteredReceiverDistricts = [];
    this.filteredReceiverPoliceStations = [];
  }

  // Cascading Sender
  onCountryChange() {
    const countryId = this.parcelForm.value.sendCountry;
  this.filteredSenderDivisions = this.divisions.filter(d => d.country?.id === countryId);
  this.filteredSenderDistricts = [];
  this.filteredSenderPoliceStations = [];
  this.parcelForm.patchValue({ sendDivision: '', sendDistrict: '', sendPoliceStation: '' });
  }

  onDivisionChange() {
    const divisionId = this.parcelForm.value.sendDivision;
  this.filteredSenderDistricts = this.districts.filter(dist => dist.division?.id === divisionId);
  this.filteredSenderPoliceStations = [];
  this.parcelForm.patchValue({ sendDistrict: '', sendPoliceStation: '' });
  }

  onDistrictChange() {
   const districtId = this.parcelForm.value.sendDistrict;
  this.filteredSenderPoliceStations = this.policeStations.filter(ps => ps.district?.id === districtId);
  this.parcelForm.patchValue({ sendPoliceStation: '' });
  }

  // Cascading Receiver
  onCountryChange2() {
   const divisionId = this.parcelForm.value.receiveDivision;
  this.filteredReceiverDistricts = this.districts.filter(dist => dist.division?.id === divisionId);
  this.filteredReceiverPoliceStations = [];
  this.parcelForm.patchValue({ receiveDistrict: '', receivePoliceStation: '' });
  }

  onDivisionChange2() {
    const divisionId = this.parcelForm.value.receiveDivision;
  this.filteredReceiverDistricts = this.districts.filter(dist => dist.division?.id === divisionId);
  this.filteredReceiverPoliceStations = [];
  this.parcelForm.patchValue({ receiveDistrict: '', receivePoliceStation: '' });
  }

  onDistrictChange2() {
     const districtId = this.parcelForm.value.receiveDistrict;
  this.filteredReceiverPoliceStations = this.policeStations.filter(ps => ps.district?.id === districtId);
  this.parcelForm.patchValue({ receivePoliceStation: '' });
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
