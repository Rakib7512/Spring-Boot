import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  trackingNumber!: string;
  

  userRole!: string | null;
  currentUser: User | null = null;
 constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  onSearch(): void {
    if (this.trackingNumber.trim()) {
      this.router.navigate(['/trackParcel', this.trackingNumber]);
    }
  }


}
