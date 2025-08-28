import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';

import { Notification } from '../../model/Notification.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  private baseUrl = 'http://localhost:8085/api/notifications';

  constructor(private http: HttpClient) { }



  getEmployeeNotifications(employeeId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/employee/${employeeId}`);
  }

  // receiveNotification(id: number, trackingId: string): Observable<string> {
  //   return this.http.put(`${this.baseUrl}/${id}/receive`, {}, { responseType: 'text' });
  // }



   receiveNotification(employeeId: number, trackingId: string, nitificationId: number ): Observable<any> {
    const notificationUrl = `${this.baseUrl}/${nitificationId}/receive`;
    const parcelUrl = "http://localhost:8085/api/parcels/parcel/" + trackingId + "/claimPickup/" + employeeId;



    return forkJoin([
      this.http.put(notificationUrl, {}, { responseType: 'text' }),
      this.http.put(parcelUrl, {}, { responseType: 'text' })
    ]);
  }









  // private isBrowser: boolean;

  // private notificationsSubject = new BehaviorSubject<any[]>([]);
  // notifications$ = this.notificationsSubject.asObservable();

  // constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  //   this.isBrowser = isPlatformBrowser(this.platformId);

  //   if (this.isBrowser) {
  //     const storedNotifications = localStorage.getItem('parcelNotifications');
  //     const parsedNotifications = storedNotifications ? JSON.parse(storedNotifications) : [];
  //     this.notificationsSubject.next(parsedNotifications);
  //   }
  // }

  // // Get notifications (optional external use)
  // getNotifications(): any[] {
  //   if (!this.isBrowser) return [];
  //   const data = localStorage.getItem('parcelNotifications');
  //   return data ? JSON.parse(data) : [];
  // }

  // // Add notification
  // addNotification(notification: any) {
  //   if (!this.isBrowser) return;

  //   const current = this.getNotifications();
  //   current.push(notification);
  //   localStorage.setItem('parcelNotifications', JSON.stringify(current));
  //   this.notificationsSubject.next(current);
  // }

  // // Clear all
  // clearNotifications() {
  //   if (!this.isBrowser) return;

  //   localStorage.removeItem('parcelNotifications');
  //   this.notificationsSubject.next([]);
  // }
}
