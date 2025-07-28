import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { User } from '../../../model/user.model';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {


  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }
  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }

onSubmit(): void {
  if (this.loginForm.valid) {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.authService.login({ email, password }).subscribe({
      next: (authResponse) => {
        // authResponse has { token, user }
        localStorage.setItem('loggedInUser', JSON.stringify(authResponse.user));
        this.router.navigate(['/user-profile']);
      },
      error: (err) => {
        console.error('Login error:', err);
        if (err.message === 'Invalid password' || err.message === 'User not found') {
          this.errorMessage = 'Invalid email or password!';
        } else {
          this.errorMessage = 'Login failed due to server error.';
        }
      }
    });
  } else {
    this.errorMessage = 'Please fill out the form correctly.';
  }
}
}