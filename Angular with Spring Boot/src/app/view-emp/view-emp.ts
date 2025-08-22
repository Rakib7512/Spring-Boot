import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { Router } from '@angular/router';
import { CountryService } from '../service/country.service';
import { DivisionService } from '../service/division.service';
import { DistrictService } from '../service/district.service';
import { PoliceStationService } from '../service/police-station.service';
import { forkJoin } from 'rxjs';
import { Employee } from '../../model/employee.model';
import { Country } from '../../model/country.module';
import { Division } from '../../model/division.model';
import { District } from '../../model/district.model';
import { PoliceStation } from '../../model/policeStation.model';

@Component({
  selector: 'app-view-emp',
  standalone: false,
  templateUrl: './view-emp.html',
  styleUrl: './view-emp.css'
})
export class ViewEmp implements OnInit{
   emp!: Employee;

  employees: Employee[] = [];
  countries: Country[] = [];
  divisions: Division[] = [];
  districts: District[] = [];
  policeStations: PoliceStation[] = [];

  constructor(
    private employeeService: EmployeeService,
    private countryService: CountryService,
    private divisionService: DivisionService,
    private districtService: DistrictService,
    private policeStationService: PoliceStationService,
    private router: Router
  ) { }
  ngOnInit(): void {
//     this.loadAllData()
//   }

//    loadAllData() {
//   forkJoin({
//     employees: this.employeeService.getAllEmployee(),
//     countries: this.countryService.getAll(),
//     divisions: this.divisionService.getAll(),
//     districts: this.districtService.getAll(),
//     policeStations: this.policeStationService.getAll()
//   }).subscribe({
//     next: ({ employees, countries, divisions, districts, policeStations }) => {
//       this.employees = employees;
//       this.countries = countries;
//       this.divisions = divisions;
//       this.districts = districts;
//       this.policeStations = policeStations;
//     },
//     error: (err) => {
//       console.error('Error loading data:', err);
//       alert('Failed to load employees or lookup data.');
//     }
//   });
// }



  

}}