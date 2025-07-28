import { Component, OnInit } from '@angular/core';
import { HubService } from '../service/hub.service';
import { CountryService } from '../service/country.service';
import { DivisionService } from '../service/division.service';
import { DistrictService } from '../service/district.service';
import { PoliceStationService } from '../service/police-station.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from '../../model/country.module';
import { Division } from '../../model/division.model';
import { District } from '../../model/district.model';
import { PoliceStation } from '../../model/policeStation.model';
import { Hub } from '../../model/hub.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-hub',
  standalone: false,
  templateUrl: './create-hub.html',
  styleUrl: './create-hub.css'
})
export class CreateHub implements OnInit {
 hubGroup!: FormGroup;
   editing: boolean = false;
   hub_Id: string | null = null;

  countries: Country[] = [];
  allDivisions: Division[] = [];
  allDistricts: District[] = [];
  allPoliceStations: PoliceStation[] = [];

  filteredDivisions: Division[] = [];
  filteredDistricts: District[] = [];
  filteredPoliceStations: PoliceStation[] = [];

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
    private divisionService: DivisionService,
    private districtService: DistrictService,
    private policeStationService: PoliceStationService,
    private hubService: HubService,
    private router:Router
  ) {

     this.hubGroup = this.fb.group({
      hubName: ['', Validators.required],
      countryId: ['', Validators.required],
      divisionId: ['', Validators.required],
      districtId: ['', Validators.required],
      policeStationId: ['', Validators.required]
    });

  }

  ngOnInit(): void {

    
    this.countryService.getAll().subscribe(data => this.countries = data);
    this.divisionService.getAll().subscribe(data => this.allDivisions = data);
    this.districtService.getAll().subscribe(data => this.allDistricts = data);
    this.policeStationService.getAll().subscribe(data => this.allPoliceStations = data);
   
  
    this.loadCountries()
  }
 loadCountries() {
    this.countryService.getAll().subscribe(data => {
    this.countries = data;
    });
  }




onCountryChange() {
  const selectedCountryId = this.hubGroup.value.countryId;
  const selectedCountry = this.countries.find(c => c.id === selectedCountryId);

  if (selectedCountry) {
    this.filteredDivisions = this.allDivisions.filter(d => selectedCountry.divisions.includes(d.id!));
    this.filteredDistricts = [];
    this.filteredPoliceStations = [];
    this.hubGroup.patchValue({ divisionId: '', districtId: '', policeStationId: '' });
  }
}


    

  onDivisionChange() {
  const selectedDivisionId = this.hubGroup.value.divisionId;
  const selectedDivision = this.allDivisions.find(d => d.id === selectedDivisionId);

  if (selectedDivision) {
    this.filteredDistricts = this.allDistricts.filter(dist => selectedDivision.districts.includes(dist.id!));
    this.filteredPoliceStations = [];
    this.hubGroup.patchValue({ districtId: '', policeStationId: '' });
  }
}




onDistrictChange() {
  const selectedDistrictId = this.hubGroup.value.districtId;
  const selectedDistrict = this.allDistricts.find(dist => dist.id === selectedDistrictId);

  if (selectedDistrict) {
    this.filteredPoliceStations = this.allPoliceStations.filter(ps => selectedDistrict.policeStations.includes(ps.id!));
    this.hubGroup.patchValue({ policeStationId: '' });
  }
}

  


  

  saveHub() {
    if (this.hubGroup.invalid) return;

    const employee: any = { ...this.hubGroup.value };
     if (this.editing) {
      employee.id = this.hub_Id;
      this.hubService.updateHub(employee).subscribe(() => {
        alert('Hub updated successfully!');
        this.router.navigate(['/view-hub']);
      });
    } else {
      this.hubService.saveHub(employee).subscribe(() => {
        alert('Hub added successfully!');
        this.hubGroup.reset();
        this.filteredDivisions = [];
        this.filteredDistricts = [];
        this.filteredPoliceStations = [];
      });
    }

   
  }
    loadHub(id: string) {
  
      //  Pre-filter dependent dropdowns
      this.onCountryChange();
      this.onDivisionChange();
      this.onDistrictChange();
    }



    
  }






