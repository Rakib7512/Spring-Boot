import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  trackingNumber!: string;

  constructor(
    private router: Router
  ){}

  onSearch(): void {
    if (this.trackingNumber.trim()) {
      this.router.navigate(['/trackParcel', this.trackingNumber]);
    }
  }
}
