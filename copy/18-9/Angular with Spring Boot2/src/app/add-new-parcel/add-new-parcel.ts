import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AddressService } from '../service/address.service';
import { FormBuilder } from '@angular/forms';
import { CountryService } from '../service/country.service';
import { DivisionService } from '../service/division.service';
import { DistrictService } from '../service/district.service';
import { PoliceStationService } from '../service/police-station.service';
import { ParcelService } from '../service/parcel.service';
import { Router } from '@angular/router';
import { StorageService } from '../service/storage-service';

@Component({
  selector: 'app-add-new-parcel',
  standalone: false,
  templateUrl: './add-new-parcel.html',
  styleUrl: './add-new-parcel.css'
})
export class AddNewParcel implements OnInit {

  countries: any[] = [];
  divisions: any[] = [];
  districts: any[] = [];
  policeStations: any[] = [];

  selectedCountry: number = 0;
  selectedDivision: number = 0;
  selectedDistrict: number = 0;
  selectedPoliceStation: number = 0;


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
    private cd: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
   this.loadCountries();
  }

   loadCountries() {
    this.addressService.getCountries().subscribe(data => {
      this.countries = data;
      console.log(this.countries);
      this.cd.markForCheck();
    });
  }

  onCountryChange() {
    this.divisions = [];
    this.districts = [];
    this.policeStations = [];
    this.selectedDivision = 0;
    this.selectedDistrict = 0;
    this.selectedPoliceStation = 0;

    if (this.selectedCountry) {
      this.addressService.getDivisionsByCountry(this.selectedCountry).subscribe(data => {
        this.divisions = data;
        this.cd.markForCheck();
      });
    }
  }

  onDivisionChange() {
    this.districts = [];
    this.policeStations = [];
    this.selectedDistrict = 0;
    this.selectedPoliceStation = 0;

    if (this.selectedDivision) {
      this.addressService.getDistrictsByDivision(this.selectedDivision).subscribe(data => {
        this.districts = data;
        this.cd.markForCheck();
      });
    }
  }

  onDistrictChange() {
    this.policeStations = [];
    this.selectedPoliceStation = 0;

    if (this.selectedDistrict) {
      this.addressService.getPoliceStationsByDistrict(this.selectedDistrict).subscribe(data => {
        this.policeStations = data;
        this.cd.markForCheck();
      });
    }
  }














}
