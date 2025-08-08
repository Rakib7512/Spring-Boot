import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsumerService } from '../service/consumer.service';

@Component({
  selector: 'app-add-consumer',
  standalone: false,
  templateUrl: './add-consumer.html',
  styleUrl: './add-consumer.css'
})
export class AddConsumer {
 userForm!: FormGroup;
  consumerForm!: FormGroup;
  photoFile!: File;
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private consumerService: ConsumerService
  ) { this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.consumerForm = this.fb.group({
      nid:['',Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
     
    });
  }

  onPhotoSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.photoFile = event.target.files[0];
      console.log('Selected file:', this.photoFile);
    }
  }

  onSubmit(): void {
    if (!this.photoFile) {
      this.message = 'Please upload a photo.';
      return;
    }
    if (this.userForm.invalid || this.consumerForm.invalid) {
      this.message = 'Please fill out all required fields.';
      return;
    }

    const user = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      phone: this.userForm.value.phone,
      password: this.userForm.value.password,
      role: 'CONSUMER' // adjust if necessary
    };

    const consumer = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      phone: this.userForm.value.phone,
      gender: this.consumerForm.value.gender,
      address: this.consumerForm.value.address,
      dateOfBirth: this.consumerForm.value.dateOfBirth
    };

    this.consumerService.registerConsumer(user, consumer, this.photoFile).subscribe({
      next: res => {
        this.message = res.Message || 'Registration successful!';
        this.userForm.reset();
        this.consumerForm.reset();
        this.photoFile = undefined!;
      },
      error: err => {
        this.message = 'Registration failed: ' + (err.error?.Message || err.message);
      }
    });
  }


}