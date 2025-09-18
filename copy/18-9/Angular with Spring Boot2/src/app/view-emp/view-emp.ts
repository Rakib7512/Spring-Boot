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
   
  employees: any[] = [];
  message: string = '';
  selectedEmployee: any = null;

  constructor(private employeeService: EmployeeService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  // Load all employees
  loadEmployees() {
    this.employeeService.getAllEmployers().subscribe({
      next: (res: any) => {
        this.employees = res;
        this.cd.markForCheck();
      },
      error: err => this.message = 'Fail: ' + (err.error?.Message || err.message)
    });
  }

  // Delete employee
  deleteEmployee(id: number) {
    if(confirm("Are you sure you want to delete this employee?")) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.message = "Employee deleted successfully!";
          this.loadEmployees();
        },
        error: err => this.message = 'Fail: ' + (err.error?.Message || err.message)
      });
    }
  }

  // View details in modal
  viewEmployee(emp: any) {
    this.selectedEmployee = emp;
    const modal = new (window as any).bootstrap.Modal(document.getElementById('employeeModal'));
    modal.show();
  }

  // Navigate to update page
  updateEmployee(emp: any) {
    alert(`Redirect to update employee with ID: ${emp.id}`);
  }
}