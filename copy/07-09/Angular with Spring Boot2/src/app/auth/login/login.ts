import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { EmployeeService } from '../../service/employee.service';
import { ConsumerService } from '../../service/consumer.service';

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
    private employeeService: EmployeeService,
    private consumerService: ConsumerService
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
      next: () => {
        this.successMessage = 'Login successful!';
        this.errorMessage = null;

        const role = this.authService.getUserRole();

        if (role === 'EMPLOYEE') {
          // ✅ শুধু Employee ID save করবো
          this.employeeService.getMyEmployeeId().subscribe({
            next: (empId: number) => {
              localStorage.setItem('employeeId', empId.toString());
              console.log('Employee ID saved in localStorage:', empId);
              this.router.navigate(['/employee-profile']);
            },
            error: (err) => {
              console.error('Could not fetch Employee ID', err);
            }
          });
        } 
        else if (role === 'CONSUMER') {
          // ✅ শুধু Consumer ID save করবো
          this.consumerService.getMyConsumerId().subscribe({
            next: (consumerId: number) => {
              localStorage.setItem('consumerId', consumerId.toString());
              console.log('Consumer ID saved in localStorage:', consumerId);
              this.router.navigate(['/user_profile']);
            },
            error: (err) => {
              console.error('Could not fetch Consumer ID', err);
            }
          });
        } 
        else if (role === 'ADMIN') {
          this.router.navigate(['/admin-dashboard']);
        } 
        else {
          this.router.navigate(['/']); 
        }
      },
      error: () => {
        this.errorMessage = 'Login failed. Please check your credentials.';
        this.successMessage = null;
      }
    });
  }
}
