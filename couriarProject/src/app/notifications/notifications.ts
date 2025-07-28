import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  standalone: false,
  templateUrl: './notifications.html',
  styleUrl: './notifications.css'
})
export class Notifications implements OnInit {


notifications: any[] = [];

  ngOnInit(): void {
   const stored = localStorage.getItem('parcelNotifications');
  this.notifications = stored ? JSON.parse(stored) : [];
  }


clearNotifications() {
  localStorage.removeItem('parcelNotifications');
  this.notifications = [];
}

}
