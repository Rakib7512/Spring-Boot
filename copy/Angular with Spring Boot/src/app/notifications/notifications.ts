import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from '../service/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notifications',
  standalone: false,
  templateUrl: './notifications.html',
  styleUrls: ['./notifications.css']
})
export class Notifications implements OnInit, OnDestroy {
  notifications: any[] = [];
  private subscription!: Subscription;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.subscription = this.notificationService.notifications$.subscribe(data => {
      this.notifications = data;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  clearAll() {
    this.notificationService.clearNotifications();
  }
}
