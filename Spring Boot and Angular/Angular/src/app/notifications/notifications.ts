import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NotificationService } from '../service/notification.service';


import { Notification } from '../../model/Notification.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.html',
  styleUrls: ['./notifications.css'],
   standalone: false,
})
export class Notifications implements OnInit {

 notifications: Notification[] = [];
  employeeId!: number;
  showToast = false; // 👈 For toast visibility

  constructor(private notificationService: NotificationService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.employeeId = Number(localStorage.getItem('employeeId')); 
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getEmployeeNotifications(this.employeeId).subscribe(data => {
      this.notifications = data;
      this.cd.markForCheck();
    });
  }

  markAsReceived(notification: Notification) {
    const match = notification.message.match(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/);
    const trackingId = match ? match[0] : null;
    if (!trackingId) return;

    this.notificationService.receiveNotification(this.employeeId, trackingId, notification.id).subscribe({
      next: () => {
        // Show toast
        this.showToast = true;
        setTimeout(() => this.showToast = false, 3000); // auto-hide after 3s

        // Mark notification as received
        notification.received = true;
        this.cd.markForCheck();
      },
      error: err => console.error(err)
    });
  }

  get unreadCount() {
    return this.notifications.filter(n => !n.received).length;
  }
}