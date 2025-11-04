import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { AuthService } from './service/auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {

  showHeader = true;


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
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const hiddenRoutes = ['/', '/login', '/registerConsumer'];

        // Add dynamic check for product details
        const isProductDetails = event.url.startsWith('/productdetails/');

        this.showHeader = !(
          hiddenRoutes.includes(event.url) || isProductDetails
        );
      }
    });
  }

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
      this.router.navigate(['/trackParcel', this.trackingNumber]);
    }
  }


}

