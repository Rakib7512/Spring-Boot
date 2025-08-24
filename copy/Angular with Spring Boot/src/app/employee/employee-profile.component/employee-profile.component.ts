import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-employee-profile.component',
  standalone: false,
  templateUrl: './employee-profile.component.html',
  styleUrl: './employee-profile.component.css'
})
export class EmployeeProfileComponent implements OnInit {


  profile: any = null;
  loading = true;
  error = '';

 
  constructor(private employerService: EmployeeService,
    private cdr: ChangeDetectorRef 
  ) { }

  ngOnInit(): void {
    this.getProfile();
  }

   getProfile() {
    this.employerService.getEmployeeProfileById().subscribe({
      next: (data) => {
        this.profile = data;
        this.cdr.markForCheck();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load profile ❌';
        console.error(err);
        this.loading = false;
      }
    });
  }
}
