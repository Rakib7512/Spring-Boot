import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { DeleveryService } from '../service/delevery.service';

@Component({
  selector: 'app-finaldelevery',
  standalone: false,
  templateUrl: './finaldelevery.html',
  styleUrl: './finaldelevery.css'
})
export class Finaldelevery implements OnInit {
  id!: string;
  deliveryForm: FormGroup;
  message: string = '';
  loading: boolean = false;
  employeeId!: number;
  hubName!: string;

  constructor(
    private deleveryService: DeleveryService,
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.deliveryForm = this.fb.group({
      trackingId: ['', Validators.required],
      employeeId: [{ value: '', disabled: true }], // readonly
      hubName: [{ value: '', disabled: true }]     // readonly
    });
  }

  ngOnInit(): void {
    // ✅ Safe localStorage access
    if (isPlatformBrowser(this.platformId)) {
      const empId = localStorage.getItem('employeeId');
      const empHub = localStorage.getItem('employeeHub');

      if (empId) {
        this.employeeId = +empId;
      }
      if (empHub) {
        this.hubName = empHub;
      }

      // patch value to form (readonly fields)
      this.deliveryForm.patchValue({
        employeeId: this.employeeId,
        hubName: this.hubName
      });
    }
  }

  onSubmit(): void {
    if (this.deliveryForm.invalid) {
      this.message = 'Please enter tracking ID!';
      return;
    }

    const trackingId = this.deliveryForm.get('trackingId')?.value;

    this.loading = true;
    this.deleveryService.deliverParcel(trackingId, this.hubName, this.employeeId).subscribe({
      next: (res) => {
        this.message = '✅ ' + "Delevary Successfull";
        this.loading = false;
        this.deliveryForm.reset();

        // keep employee info visible after reset
        this.deliveryForm.patchValue({
          employeeId: this.employeeId,
          hubName: this.hubName
        });
      },
      error: (err) => {
        this.message = '❌ Error: ' + (err.error || 'Something went wrong');
        this.loading = false;
      }
    });
  }
}
