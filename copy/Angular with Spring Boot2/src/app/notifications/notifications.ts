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

  constructor(private notificationService: NotificationService, 
              private cd: ChangeDetectorRef,
        ) {}

  ngOnInit(): void {
    // 👇 Load logged-in employeeId (from localStorage after login)
    this.employeeId = Number(localStorage.getItem('employeeId')); 
    this.loadNotifications();
    this.cd.markForCheck();
  }

  loadNotifications() {
    this.notificationService.getEmployeeNotifications(1).subscribe(
      data => {
      this.notifications = data;
      this.cd.markForCheck();
      console.log(this.notifications);
    });
  }

markAsReceived(notification: Notification) {
  // ✅ Extract tracking ID from message using regex
  const match = notification.message.match(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/);
  const trackingId = match ? match[0] : null;

console.log(trackingId);
console.log(notification.id);

  if (!trackingId) return; // no tracking ID found

  // Call both APIs

  this.notificationService.receiveNotification( 1, trackingId , notification.id).subscribe({
    next: (res) => console.log('Pickup claimed:', res),
    error: (err) => console.error(err)
  });
}


  get unreadCount() {
    return this.notifications.filter(n => !n.received).length;
  }




}
