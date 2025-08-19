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
    this.loadAllData()
  }

   loadAllData() {
  forkJoin({
    employees: this.employeeService.getAllEmployee(),
    countries: this.countryService.getAll(),
    divisions: this.divisionService.getAll(),
    districts: this.districtService.getAll(),
    policeStations: this.policeStationService.getAll()
  }).subscribe({
    next: ({ employees, countries, divisions, districts, policeStations }) => {
      this.employees = employees;
      this.countries = countries;
      this.divisions = divisions;
      this.districts = districts;
      this.policeStations = policeStations;
    },
    error: (err) => {
      console.error('Error loading data:', err);
      alert('Failed to load employees or lookup data.');
    }
  });
}

  getCountryName(id: number): string {
    return this.countries.find(c => c.id == id)?.name || '';
  }

  getDivisionName(id: number): string {
    return this.divisions.find(d => d.id == id)?.name || '';
  }

  getDistrictName(id: number): string {
    return this.districts.find(dist => dist.id == id)?.name || '';
  }
  getEmpOnHub(id: number){
 return this.policeStations.find(ps => ps.id == id)?.name || '';
  }

  getPoliceStationName(id: number): string {
    return this.policeStations.find(ps => ps.id == id)?.name || '';
  }

  getEmpByid(id: number) {
    this.employeeService.getEmpById(id).subscribe({
      next: (data) => {
        this.emp = data;
        this.router.navigate(['/sinemp', id]);

      },
      error: (err) => {
        console.log(err);
      }
    });

  }


  deleteEmployee(id: number) {
  if (confirm('Are you sure you want to delete this employee?')) {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      alert('Deleted!');
      this.loadAllData();
    });
  }
}
}