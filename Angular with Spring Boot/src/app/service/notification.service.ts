import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private isBrowser: boolean;

  private notificationsSubject = new BehaviorSubject<any[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      const storedNotifications = localStorage.getItem('parcelNotifications');
      const parsedNotifications = storedNotifications ? JSON.parse(storedNotifications) : [];
      this.notificationsSubject.next(parsedNotifications);
    }
  }

  // Get notifications (optional external use)
  getNotifications(): any[] {
    if (!this.isBrowser) return [];
    const data = localStorage.getItem('parcelNotifications');
    return data ? JSON.parse(data) : [];
  }

  // Add notification
  addNotification(notification: any) {
    if (!this.isBrowser) return;

    const current = this.getNotifications();
    current.push(notification);
    localStorage.setItem('parcelNotifications', JSON.stringify(current));
    this.notificationsSubject.next(current);
  }

  // Clear all
  clearNotifications() {
    if (!this.isBrowser) return;

    localStorage.removeItem('parcelNotifications');
    this.notificationsSubject.next([]);
  }
}
