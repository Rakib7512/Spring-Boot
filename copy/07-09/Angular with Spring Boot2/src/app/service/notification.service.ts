import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Notification } from '../../model/Notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = 'http://localhost:8085/api/notifications';

  constructor(private http: HttpClient) { }

  // Helper method to get the authorization token from localStorage
  private getAuthToken(): string {
    return localStorage.getItem('authToken') || '';  // return empty string if no token
  }

  // Helper method to set headers with authorization
  private getHeaders() {
    const token = this.getAuthToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Add the token to the request headers
      'Content-Type': 'application/json'
    });
  }

  // Get notifications for a specific employee
  getEmployeeNotifications(employeeId: number): Observable<Notification[]> {
    const headers = this.getHeaders();
    return this.http.get<Notification[]>(`${this.baseUrl}/employee/${employeeId}`, { headers });
  }

  // Mark notification as received and claim pickup for the parcel
  receiveNotification(employeeId: number, trackingId: string, notificationId: number): Observable<any> {
    const notificationUrl = `${this.baseUrl}/${notificationId}/receive`;
    const parcelUrl = `http://localhost:8085/api/parcels/parcel/${trackingId}/claimPickup/${employeeId}`;

    const headers = this.getHeaders();  // Using headers with Authorization

    return forkJoin([
      this.http.put(notificationUrl, {}, { headers, responseType: 'text' }),
      this.http.put(parcelUrl, {}, { headers, responseType: 'text' })
    ]);
  }
}
