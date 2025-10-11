import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { User } from '../../../model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: false,
  templateUrl: './registration.html',
  styleUrl: './registration.css'
})
export class Registration {
  regForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

    this.regForm = this.formBuilder.group({
      userId: [''],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nid: ['', Validators.required],
      password: ['', Validators.required],
      role:['user'],
       
    })
  }


  onSubmit(): void {
    if (this.regForm.valid) {

      const user: User = {
        ...this.regForm.value,
        role: 'user'
      };

    //   this.authService.registration(user).subscribe({
    //     next: (res) => {
    //        alert('Registration successfully!');
    //       this.authService.storeToken(res.token);
    //       this.router.navigate(['/login']); // Navigate to a protected route after registration
    //     },
    //     error: (err) => {
    //       console.error('Error registering user:', err);
    //     }
    //   });
    // }
    // else {
    //   alert("Complte mandatory Field");
    }
  }

  }
