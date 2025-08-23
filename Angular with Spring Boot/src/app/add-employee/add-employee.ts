import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from '../../model/country.module';
import { Division } from '../../model/division.model';
import { District } from '../../model/district.model';
import { PoliceStation } from '../../model/policeStation.model';
import { EmployeeService } from '../service/employee.service';
import { CountryService } from '../service/country.service';
import { DivisionService } from '../service/division.service';
import { DistrictService } from '../service/district.service';
import { PoliceStationService } from '../service/police-station.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from '../service/address.service';

@Component({
  selector: 'app-add-employee',
  standalone: false,
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css'
})
export class AddEmployee implements OnInit {

  registrationForm!: FormGroup;
  photoFile!: File;
  message: string = '';
  countries: any[] = [];
  divisions: any[] = [];
  districts: any[] = [];
  policeStations: any[] = [];

  selectedCountry: number = 0;
  selectedDivision: number = 0;
  selectedDistrict: number = 0;
  selectedPoliceStation: number = 0;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private addressService: AddressService,
    private cd: ChangeDetectorRef
  ) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      gender: ['', Validators.required],
      nid: ['', Validators.required],
      address: ['', Validators.required],
      designation: ['', Validators.required],
      joindate: ['', Validators.required],
      salary: ['', Validators.required],
      empOnHub: ['', Validators.required],
      country: ['', Validators.required],
      division: ['', Validators.required],
      district: ['', Validators.required],
      policeStation: ['', Validators.required],

    });
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.photoFile = input.files[0];
      console.log('Selected file:', this.photoFile);
    }
    else {
      this.message = 'Fail: Please upload a photo.';
    }
  }

  ngOnInit() {
    if (!this.photoFile) {
      this.loaCountries()

      return;
    }
    if (this.registrationForm.invalid) {
      this.message = 'Fail: Please fill out all required fields.';
      return;
    }



  }


  onSubmit() {

    if (this.registrationForm.invalid) {
      this.message = 'Fail: Please fill out all required fields.';
      return;
    }

    const user = {
      name: this.registrationForm.value.name,
      email: this.registrationForm.value.email,
      phone: this.registrationForm.value.phone,
      password: this.registrationForm.value.password,
      role: 'EMPLOYEE'
    };

    const employee = {
      name: this.registrationForm.value.name,
      email: this.registrationForm.value.email,
      gender: this.registrationForm.value.gender,
      nid: this.registrationForm.value.nid,
      address: this.registrationForm.value.address,
      designation: this.registrationForm.value.designation,
      joindate: this.registrationForm.value.joindate,
      empOnHub: this.registrationForm.value.empOnHub,
      salary: this.registrationForm.value.salary,
      country: this.registrationForm.value.country,
      division: this.registrationForm.value.division,
      district: this.registrationForm.value.district,
      policeStation: this.registrationForm.value.policeStation,
    };

    console.log(employee);
    console.log(user);
    console.log(this.photoFile)

    this.employeeService.registerEmployee(user, employee, this.photoFile).subscribe({
      next: res => {
        this.message = 'Success: ' + (res.Message || 'Registration successful!');
        this.registrationForm.reset();
        this.photoFile = undefined!;
      },
      error: err => {
        this.message = 'Fail: ' + (err.error?.Message || err.message);
      }
    });
  }








  onCountryChange() {
    this.divisions = [];
    this.districts = [];
    this.policeStations = [];
    this.selectedDivision = 0;
    this.selectedDistrict = 0;
    this.selectedPoliceStation = 0;
    this.cd.markForCheck();
    if (this.selectedCountry) {
      this.addressService.getDivisionsByCountry(this.selectedCountry)
        .subscribe(data => this.divisions = data);
    }
  }

  onDivisionChange() {
    this.districts = [];
    this.policeStations = [];
    this.selectedDistrict = 0;
    this.selectedPoliceStation = 0;
    this.cd.markForCheck();
    if (this.selectedDivision) {
      this.addressService.getDistrictsByDivision(this.selectedDivision)
        .subscribe(data => this.districts = data);
    }
  }

  onSendDistrictChange() {
    this.policeStations = [];
    this.selectedPoliceStation = 0;
    this.cd.markForCheck();
    if (this.selectedDistrict) {
      this.addressService.getPoliceStationsByDistrict(this.selectedDistrict)
        .subscribe(data => this.policeStations = data);
    }
  }

  loaCountries() {
    this.addressService.getCountries().subscribe(data => {
      this.countries = data; this.cd.markForCheck();
    });
  }
}