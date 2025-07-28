import { Component, OnInit } from '@angular/core';
import { Parcel } from '../../model/parcel.model';
import { ParcelService } from '../service/parcel.service';
import { Country } from '../../model/country.module';
import { Division } from '../../model/division.model';
import { District } from '../../model/district.model';
import { PoliceStation } from '../../model/policeStation.model';
import { CountryService } from '../service/country.service';
import { DivisionService } from '../service/division.service';
import { DistrictService } from '../service/district.service';
import { PoliceStationService } from '../service/police-station.service';
import { EmployeeService } from '../service/employee.service';
import { Employee } from '../../model/employee.model';
import { FormGroup } from '@angular/forms';
import { RecParcelEmpDetService } from '../service/rec-parcel-emp-det.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { User } from '../../model/user.model';
import { Observable } from 'rxjs';
import { RecParcelEmpDetModel } from '../../model/recParcelByEmpDet.modek';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-parcel-req-details',
  standalone: false,
  templateUrl: './parcel-req-details.html',
  styleUrl: './parcel-req-details.css'
})
export class ParcelReqDetails implements OnInit {

  editing: boolean = false;
  highlightInput = false;

  parcelId: string = '';
  parcel?: Parcel;
  errorMsg: string = '';
  RecForm!: FormGroup;

  user!: User | null;

  notifications: any[] = [];
  employees: Employee[] = [];
  countries: Country[] = [];
  divisions: Division[] = [];
  districts: District[] = [];
  policeStations: PoliceStation[] = [];

  constructor(
    private route: ActivatedRoute,
    private parcelService: ParcelService,
    private employeeService: EmployeeService,
    private countryService: CountryService,
    private divisionService: DivisionService,
    private districtService: DistrictService,
    private policeStationService: PoliceStationService,
    private recParcelEmpService: RecParcelEmpDetService,
    private authService: AuthService,
    private http:HttpClient





  ) { }
  loggedInUser: any;
  ngOnInit(): void {
    this.loadLocationData();
    this.getUserDetails();


    //  Load parcel by tracking ID from query params
    this.route.queryParams.subscribe(params => {
      if (params['trackingId']) {
        this.parcelId = params['trackingId'];

        this.highlightInput = true;
        setTimeout(() => {
          this.highlightInput = false;
        }, 1000); // 1 সেকেন্ড পর হাইলাইট বন্ধ

        this.fetchParcel();
      }
    });


    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem('parcelNotifications');
      this.notifications = stored ? JSON.parse(stored) : [];
    } else {
      console.warn('localStorage is not available.');
      this.notifications = [];
    }
  }



  getUserDetails() {
    this.user = this.authService.currentUserValue;
    console.log(this.user);

  }





  loadLocationData(): void {
    this.employeeService.getAllEmployee().subscribe(data => this.employees = data);
    this.countryService.getAll().subscribe(data => this.countries = data);
    this.divisionService.getAll().subscribe(data => this.divisions = data);
    this.districtService.getAll().subscribe(data => this.districts = data);
    this.policeStationService.getAll().subscribe(data => this.policeStations = data);
  }

  fetchParcel() {
    this.parcelService.getParcelById(this.parcelId).subscribe({
      next: (data) => {
        this.parcel = data;
        this.errorMsg = '';
      },
      error: () => {
        this.parcel = undefined;
        this.errorMsg = 'Parcel not found!';
      }
    });
  }
  getCountryName(id: string): string {
    return this.countries.find(c => c.id === id)?.name || id;
  }

  getDivisionName(id: string): string {
    return this.divisions.find(d => d.id === id)?.name || id;
  }

  getDistrictName(id: string): string {
    return this.districts.find(d => d.id === id)?.name || id;
  }

  getPoliceStationName(id: string): string {
    return this.policeStations.find(p => p.id === id)?.name || id;
  }



  clearNotifications() {
    localStorage.removeItem('parcelNotifications');
    this.notifications = [];
  }




  saveReceivedParcel() {
    if (!this.parcel) {
      alert('Parcel খুঁজে পাওয়া যায়নি!');
      return;
    }

    // লোকালস্টোরেজ থেকে লগইন করা ইউজার খুঁজে আনছি
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    if (!currentUser || !currentUser.id) {
      alert('Login করা ইউজার খুঁজে পাওয়া যায়নি!');
      return;
    }

    const receivedParcel = {
      parcelId: this.parcel.trackingId,
      employeeId: currentUser.id,
      employeeName: currentUser.name,
      currentHub: currentUser.currentHub,
      receivedAt: new Date(),
      senderName: this.parcel.senderName,
      senderPhone: this.parcel.senderPhone,
      senderCountry: this.getCountryName(this.parcel.sendCountry),
      senderDivision: this.getDivisionName(this.parcel.sendDivision),
      senderDistrict: this.getDistrictName(this.parcel.sendDistrict),
      senderPoliceStation: this.getPoliceStationName(this.parcel.sendPoliceStation),
      senderAddress: this.parcel.senderAddress,

      receiverName: this.parcel.receiverName,
      receiverPhone: this.parcel.receiverPhone,
      receiveCountry: this.getCountryName(this.parcel.receiveCountry),
      receiveDivision: this.getDivisionName(this.parcel.receiveDivision),
      receiveDistrict: this.getDistrictName(this.parcel.receiveDistrict),
      receivePoliceStation: this.getPoliceStationName(this.parcel.receivePoliceStation),
      receiveAddress: this.parcel.receiverAddress,



    };

    this.recParcelEmpService.saveReceivedParcel(receivedParcel).subscribe({
      next: () => {
        alert(' Receive Parcel by ' + receivedParcel.employeeName);
      },
      error: () => {
        alert(' রিসিভ সংরক্ষণ ব্যর্থ হয়েছে!');
      }
    });
  }

  // helper function
  getCurrentHubOfEmployee(user: any): string {
    const ps = this.policeStations.find(p => p.id === user.policeStation);
    return ps ? ps.name : 'Unknown Hub';
  }










}






