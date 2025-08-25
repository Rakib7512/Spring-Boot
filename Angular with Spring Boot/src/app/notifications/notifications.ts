import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: false,
  templateUrl: './notifications.html',
  styleUrl: './notifications.css'
})
export class Notifications implements OnInit {

 notifications: any[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    // ✅ Subscribe to notifications
    this.notificationService.notifications$.subscribe((data) => {
      this.notifications = data;
    });
  }

  clearAll() {
    this.notificationService.clearNotifications();
  }
}

