import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  constructor(
    private notificationService: NotificationService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Get the logged-in employeeId from localStorage
    this.employeeId = Number(localStorage.getItem('employeeId')); 

    // Load notifications for the employee
    if (this.employeeId) {
      this.loadNotifications();
    } else {
      console.error('Employee ID not found in localStorage.');
    }
  }

  loadNotifications(): void {
    // Ensure the API is called with the dynamic employee ID
    this.notificationService.getEmployeeNotifications(this.employeeId).subscribe({
      next: (data) => {
        this.notifications = data;
        this.cd.markForCheck(); // Ensure UI is updated
        console.log(this.notifications);
      },
      error: (err) => {
        console.error('Error loading notifications:', err);
        alert('Failed to load notifications. Please try again.');
      }
    });
  }

  markAsReceived(notification: Notification): void {
    // Extract tracking ID from the notification message using regex
    const match = notification.message.match(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/);
    const trackingId = match ? match[0] : null;

    if (!trackingId) {
      console.error('No tracking ID found in message.');
      return; // No tracking ID found, exit the method
    }

    // Call the service to mark the notification as received and claim the pickup
    this.notificationService.receiveNotification(this.employeeId, trackingId, notification.id).subscribe({
      next: (res) => {
        console.log('Pickup claimed:', res);
      },
      error: (err) => {
        console.error('Error claiming pickup:', err);
        alert('Failed to claim the pickup. Please try again.');
      }
    });
  }

  // Get unread notifications count
  get unreadCount() {
    return this.notifications.filter(n => !n.received).length;
  }
}
