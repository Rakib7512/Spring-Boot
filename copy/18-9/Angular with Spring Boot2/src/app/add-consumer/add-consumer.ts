import { Component, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsumerService } from '../service/consumer.service';

@Component({
  selector: 'app-add-consumer',
  standalone: false,
  templateUrl: './add-consumer.html',
  styleUrls: ['./add-consumer.css']
})

export class AddConsumer {
  registrationForm!: FormGroup;
  photoFile!: File;
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private consumerService: ConsumerService
  ) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      gender: ['', Validators.required],
      nid: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.photoFile = input.files[0];
      console.log('Selected file:', this.photoFile);
    }
  }

  onSubmit(): void {
    if (!this.photoFile) {
      this.message = 'Fail: Please upload a photo.';
      return;
    }
    if (this.registrationForm.invalid) {
      this.message = 'Fail: Please fill out all required fields.';
      return;
    }

    const user = {
      name: this.registrationForm.value.name,
      email: this.registrationForm.value.email,
      phone: this.registrationForm.value.phone,
      password: this.registrationForm.value.password,
      role: 'CONSUMER'
    };

    const consumer = {
      name: this.registrationForm.value.name,
      gender: this.registrationForm.value.gender,
      nid: this.registrationForm.value.nid,
      address: this.registrationForm.value.address,
      email: this.registrationForm.value.email,
      phone: this.registrationForm.value.phone,
    };

    this.consumerService.registerConsumer(user, consumer, this.photoFile).subscribe({
      next: res => {
        this.message = 'Success: ' + (res.Message || 'Registration successful!');
        this.registrationForm.reset();
        this.photoFile = undefined!;
      },
      error: err => {
        this.message = 'Fail: ' + (err.error?.Message || err.message);
      }
    });
  }
}
