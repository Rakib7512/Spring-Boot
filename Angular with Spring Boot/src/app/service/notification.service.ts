import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
private baseUrl=environment.apiBaseUrl+'/notifications/';

  constructor(private http: HttpClient) { }

  // Employee notifications fetch
  getNotifications(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/${userId}`);
  }

  // Mark as read
  markAsRead(notificationId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${notificationId}/read`, {});
  }
}
