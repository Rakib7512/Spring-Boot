import { ChangeDetectorRef, Component } from '@angular/core';
import { User } from '../../../model/user.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { EmployeeService } from '../../service/employee.service';
import { ConsumerService } from '../../service/consumer.service';

@Component({
  selector: 'app-consumer-profile.component',
  standalone: false,
  templateUrl: './consumer-profile.component.html',
  styleUrl: './consumer-profile.component.css'
})
export class ConsumerProfileComponent {

  profile: any = null;
  loading = true;
  error = '';

  constructor(private consumerService: ConsumerService,
    private cdr: ChangeDetectorRef 
  ) { }

   ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.consumerService.getProfile().subscribe({
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