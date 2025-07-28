import { Component, OnInit } from '@angular/core';
import { District } from '../../model/district.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DivisionService } from '../service/division.service';
import { DistrictService } from '../service/district.service';
import { Division } from '../../model/division.model';
import { PoliceStation } from '../../model/policeStation.model';
import { console } from 'inspector';

@Component({
  selector: 'app-add-division',
  standalone: false,
  templateUrl: './add-division.html',
  styleUrl: './add-division.css'
})
export class AddDivision implements OnInit {
  divisionForm: FormGroup;
  districts: District[] = [];
  divisions: Division[] = [];
  policeStations: PoliceStation[] = [];

  constructor(
    private fb: FormBuilder,
    private divisionService: DivisionService,
    private districtService: DistrictService
  ) {
    this.divisionForm = this.fb.group({
      name: ['', Validators.required],
      district: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadDistrict();
  }

  loadDistrict() {
    this.districtService.getAll().subscribe(data => {
      this.districts = data;
    });
  }

  onSubmit() {
    if (this.divisionForm.invalid) return;

    const division: Division = this.divisionForm.value;

    this.divisionService.add(division).subscribe(() => {
      alert('Division Add Successful');
      this.divisionForm.reset();

    });
  }

}
