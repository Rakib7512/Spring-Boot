import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import {EmployeeResponseDTO } from '../../model/employee.model';

@Component({
  selector: 'app-view-emp',
  templateUrl: './view-emp.html',
  styleUrls: ['./view-emp.css'],
  standalone: false
})
export class ViewEmp implements OnInit {
  employees: EmployeeResponseDTO[] = [];
  message: string = '';
  selectedEmployee: EmployeeResponseDTO | null = null;

  constructor(private employeeService: EmployeeService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
  this.employeeService.getAllEmployers().subscribe({
    next: (res: EmployeeResponseDTO[]) => {
      this.employees = res;
      this.cd.markForCheck();
    },
    error: err => this.message = 'Fail: ' + (err.error?.Message || err.message)
  });
}


  viewEmployee(emp: EmployeeResponseDTO) {
    this.selectedEmployee = emp;
    const modal = new (window as any).bootstrap.Modal(document.getElementById('employeeModal'));
    modal.show();
  }

  updateEmployee(emp: EmployeeResponseDTO) {
    alert(`Redirect to update employee with ID: ${emp.id}`);
  }

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
}