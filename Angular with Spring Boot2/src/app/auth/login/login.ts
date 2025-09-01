import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

 loginForm!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
  if (this.loginForm.invalid) {
    return;
  }

  const { email, password } = this.loginForm.value;

  this.authService.login(email, password).subscribe({
    next: (response) => {
      this.successMessage = 'Login successful!';
      this.errorMessage = null;

      // ✅ Call getMyEmployeeId() here
      this.employeeService.getMyEmployeeId().subscribe({
        next: (empId) => {
          console.log('Employee ID saved in localStorage:', empId);

          // ✅ Navigate only after we have employeeId
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Could not fetch Employee ID', err);

          // You can still redirect even if EmployeeId is not found
          this.router.navigate(['/']);
        }
      });
    },
    error: (err) => {
      this.errorMessage = 'Login failed. Please check your credentials.';
      this.successMessage = null;
    }
  });
}


}