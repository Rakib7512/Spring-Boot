import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
  

//   userRole!: string;
//   currentUser: User | null = null;

//   protected title = 'couriarProject';
//   trackingNumber: string = '';

//    constructor(
//     private authService: AuthService,
//     private cdr: ChangeDetectorRef
//   ){}
//   ngOnInit(): void {
//     //  this.authService.currentUser$.subscribe(user => {
//     //   this.currentUser = user;
//     //   this.userRole = user?.role || null;
//     // });
//     this.getRole();
//   }

//   getRole(): void{
//     this.userRole = JSON.stringify(localStorage.getItem('userRole'));
//     console.log(this.userRole);
//     this.cdr.markForCheck();
//   }


// onSearch(): void {
//   if (this.trackingNumber.trim()) {
//     alert(`Tracking shipment: ${this.trackingNumber}`);
//     // আপনি চাইলে router.navigate করে tracking পেজে পাঠাতে পারেন:
//     // this.router.navigate(['/track', this.trackingNumber]);
//   }





userRole!: string | null;
  currentUser: User | null = null;

  protected title = 'couriarProject';
  trackingNumber: string = '';

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.authService.userRole$.subscribe(role => {
    this.userRole = role;
    this.getRole();
    this.cdr.markForCheck();
  });
  }

  getRole(): void {
    this.userRole = this.authService.getUserRole();  
    console.log(this.userRole);
    this.cdr.markForCheck();
  }

  
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isConsumer(): boolean {
    return this.authService.isConsumer();
  }

  isEmployee(): boolean {
    return this.authService.isEmployee();
  }

  onSearch(): void {
    if (this.trackingNumber.trim()) {
      alert(`Tracking shipment: ${this.trackingNumber}`);
      
    }
  }


}

