import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-add-employee',
  standalone: false,
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css'
})
export class AddEmployee implements OnInit {

  employeeForm: FormGroup;
  editing: boolean = false;
  employeeId: string | null = null;

  countries: Country[] = [];
  allDivisions: Division[] = [];
  allDistricts: District[] = [];
  allPoliceStations: PoliceStation[] = [];

  filteredDivisions: Division[] = [];
  filteredDistricts: District[] = [];
  filteredPoliceStations: PoliceStation[] = [];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private countryService: CountryService,
    private divisionService: DivisionService,
    private districtService: DistrictService,
    private policeStationService: PoliceStationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      salary: [0, [Validators.required, Validators.min(0)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNo: ['', Validators.required],
      gender: ['', Validators.required],
      designation: ['', Validators.required],
      joindate: ['', Validators.required],
      image: ['', Validators.required],
      country: ['', Validators.required],
      division: ['', Validators.required],
      district: ['', Validators.required],
      policeStation: ['', Validators.required],
      empOnHub: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.countryService.getAll().subscribe(data => this.countries = data);
    this.divisionService.getAll().subscribe(data => this.allDivisions = data);
    this.districtService.getAll().subscribe(data => this.allDistricts = data);
    this.policeStationService.getAll().subscribe(data => this.allPoliceStations = data);

    // ✅ Check if editing
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.editing = true;
        this.employeeId = id;
        this.loadEmployee(this.employeeId);
      }
    });


  }

  onCountryChange() {
    const selectedCountryId = this.employeeForm.value.country;
    const selectedCountry = this.countries.find(c => c.id == selectedCountryId);
    if (selectedCountry) {
      this.filteredDivisions = this.allDivisions.filter(d => selectedCountry.divisions.includes(d.id!));
      this.filteredDistricts = [];
      this.filteredPoliceStations = [];
      this.employeeForm.patchValue({ division: '', district: '', policeStation: '' });
    }
  }

  onDivisionChange() {
    const selectedDivisionId = this.employeeForm.value.division;
    const selectedDivision = this.allDivisions.find(d => d.id == selectedDivisionId);
    if (selectedDivision) {
      this.filteredDistricts = this.allDistricts.filter(dist => selectedDivision.districts.includes(dist.id!));
      this.filteredPoliceStations = [];
      this.employeeForm.patchValue({ district: '', policeStation: '' });
    }
  }

  onDistrictChange() {
    const selectedDistrictId = this.employeeForm.value.district;
    const selectedDistrict = this.allDistricts.find(dist => dist.id == selectedDistrictId);
    if (selectedDistrict) {
      this.filteredPoliceStations = this.allPoliceStations.filter(ps => selectedDistrict.policeStations.includes(ps.id!));
      this.employeeForm.patchValue({ policeStation: '' });
    }
  }

  onSubmit() {
    if (this.employeeForm.invalid) return;

    const employee: any = { ...this.employeeForm.value };

    if (this.editing) {
      employee.id = this.employeeId;
      this.employeeService.updateEmployee(employee).subscribe(() => {
        alert('Employee updated successfully!');
        this.router.navigate(['/view-employees']);
      });
    } else {
      this.employeeService.saveEmployee(employee).subscribe(() => {
        alert('Employee added successfully!');
        this.employeeForm.reset();
        this.filteredDivisions = [];
        this.filteredDistricts = [];
        this.filteredPoliceStations = [];
      });
    }
  }


  loadEmployee(id: string) {
    this.employeeService.getEmpById(id).subscribe(emp => {
      this.employeeForm.patchValue(emp);

      //  Pre-filter dependent dropdowns
      this.onCountryChange();
      this.onDivisionChange();
      this.onDistrictChange();
    });
  }

}
