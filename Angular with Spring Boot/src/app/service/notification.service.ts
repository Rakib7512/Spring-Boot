import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
private baseUrl=environment.apiBaseUrl+'/notifications/';

  private notificationsSubject = new BehaviorSubject<any[]>(this.getNotifications());
  notifications$ = this.notificationsSubject.asObservable();

  constructor() {}

  // ✅ Get notifications from localStorage
  getNotifications(): any[] {
    return JSON.parse(localStorage.getItem('parcelNotifications') || '[]');
  }

  // ✅ Add a new notification
  addNotification(notification: any) {
    const notifications = this.getNotifications();
    notifications.push(notification);
    localStorage.setItem('parcelNotifications', JSON.stringify(notifications));
    this.notificationsSubject.next(notifications);
  }

  // ✅ Clear all notifications
  clearNotifications() {
    localStorage.removeItem('parcelNotifications');
    this.notificationsSubject.next([]);
  }
}
