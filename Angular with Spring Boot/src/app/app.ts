import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {

  userRole: string | null = '';
  currentUser: User | null = null;

  protected title = 'couriarProject';
  trackingNumber: string = '';

   constructor(
    private authService: AuthService,
  ){}
  ngOnInit(): void {
     this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.userRole = user?.role || null;
    });
  }


onSearch(): void {
  if (this.trackingNumber.trim()) {
    alert(`Tracking shipment: ${this.trackingNumber}`);
    // আপনি চাইলে router.navigate করে tracking পেজে পাঠাতে পারেন:
    // this.router.navigate(['/track', this.trackingNumber]);
  }
}
}
