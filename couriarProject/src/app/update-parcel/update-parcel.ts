import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Parcel } from '../../model/parcel.model';
import { ParcelService } from '../service/parcel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../service/country.service';
import { Country } from '../../model/country.module';
import { DivisionService } from '../service/division.service';
import { Division } from '../../model/division.model';
import { District } from '../../model/district.model';
import { DistrictService } from '../service/district.service';
import { PoliceStation } from '../../model/policeStation.model';
import { PoliceStationService } from '../service/police-station.service';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-update-parcel',
  standalone: false,
  templateUrl: './update-parcel.html',
  styleUrl: './update-parcel.css'
})
export class UpdateParcel implements OnInit{
   parcelForm!: FormGroup;
  editing: boolean = false;
 



   countries: Country[] = [];
  allDivisions: Division[] = [];
  allDistricts: District[] = [];
  allPoliceStations: PoliceStation[] = [];

  filteredDivisions: Division[] = [];
  filteredDistricts: District[] = [];
  filteredPoliceStations: PoliceStation[] = [];





  id:string='';
  parcel:Parcel=new Parcel();
  constructor(
    private parcelService:ParcelService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private countryService:CountryService,
    private country:Country,
    private divisionService:DivisionService,
    private division:Division,
    private district:District,
    private districtService:DistrictService,
    private policeStation:PoliceStation,
    private policeStationService:PoliceStationService



  ){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  loadParcelById() {
    // nicher id ta holo service class ar update ar return ar id
    this.id = this.route.snapshot.params['id'];
    this.parcelService.getParcelById(this.id).subscribe({
      next: (res) => {
        this.parcel = res;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('error fetching student:', err)
      }
    });
  }

  updateParcel(): void {
    this.parcelService.updateParcel(this.id, this.parcel).subscribe({
      next: () => this.router.navigate(['/allparcel']),
      error: (err) => console.error('update fail', err)
    });
  }

  onCountryChange() {
    const selectedCountryId = this.parcelForm.value.country;
    const selectedCountry = this.countries.find(c => c.id == selectedCountryId);
    if (selectedCountry) {
      this.filteredDivisions = this.allDivisions.filter(d => selectedCountry.divisions.includes(d.id!));
      this.filteredDistricts = [];
      this.filteredPoliceStations = [];
      this.parcelForm.patchValue({ division: '', district: '', policeStation: '' });
    }
  }

  onDivisionChange() {
    const selectedDivisionId = this.parcelForm.value.division;
    const selectedDivision = this.allDivisions.find(d => d.id == selectedDivisionId);
    if (selectedDivision) {
      this.filteredDistricts = this.allDistricts.filter(dist => selectedDivision.districts.includes(dist.id!));
      this.filteredPoliceStations = [];
      this.parcelForm.patchValue({ district: '', policeStation: '' });
    }
  }

  onDistrictChange() {
    const selectedDistrictId = this.parcelForm.value.district;
    const selectedDistrict = this.allDistricts.find(dist => dist.id == selectedDistrictId);
    if (selectedDistrict) {
      this.filteredPoliceStations = this.allPoliceStations.filter(ps => selectedDistrict.policeStations.includes(ps.id!));
      this.parcelForm.patchValue({ policeStation: '' });
    }
  }


}
  


