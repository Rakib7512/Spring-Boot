import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoliceStation } from '../../model/policeStation.model';
import { DistrictService } from '../service/district.service';
import { PoliceStationService } from '../service/police-station.service';
import { District } from '../../model/district.model';

@Component({
  selector: 'app-add-district',
  standalone: false,
  templateUrl: './add-district.html',
  styleUrl: './add-district.css'
})
export class AddDistrict implements OnInit {

  districtForm: FormGroup;
  policeStations: PoliceStation[] = [];
  constructor(
    private fb: FormBuilder,
    private districtService: DistrictService,
    private policeStationService: PoliceStationService

  ) {
    this.districtForm = this.fb.group({
      name: ['', Validators.required],
      policeStation: [[], Validators.required]

    });
  }
  ngOnInit(): void {
    this.loadPoliceStation();
  }
  loadPoliceStation() {
    this.policeStationService.getAll().subscribe(data => {
      this.policeStations = data;


    });
  }
  onSubmit() {
    if (this.districtForm.invalid) return;

    const district: District = this.districtForm.value;
    this.districtService.add(district).subscribe(() => {
      alert('District Add Successful');
      this.districtForm.reset

    });
  }
}
