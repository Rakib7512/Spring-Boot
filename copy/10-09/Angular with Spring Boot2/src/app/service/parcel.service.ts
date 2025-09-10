import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Parcel } from '../../model/parcel.model';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { ParcelTracking } from '../../model/trackingParcel.model';
import { ParcelTrackingDTO } from '../../model/parcelTrackingDTO';

@Injectable({
  providedIn: 'root'
})
export class ParcelService {

  private baseUrl=environment.apiBaseUrl+'/parcels/';
  
 private baseUrl2=environment.apiBaseUrl+'/parcels/parcel/';



  constructor(private http: HttpClient) {}

  saveParcel(parcel: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, parcel);
  }

  getAllParcels(): Observable<Parcel[]> {
    return this.http.get<Parcel[]>('http://localhost:8085/api/parcels');
  }

  updateParcel(parcel: Parcel): Observable<Parcel> {
    return this.http.put<Parcel>(`${this.baseUrl}/`, parcel);
  }

  patchParcel(id: number, partial: Partial<Parcel>): Observable<Parcel> {
    return this.http.patch<Parcel>(`${this.baseUrl}/${id}`, partial);
  }

  getParcelById(id: string): Observable<Parcel> {
    return this.http.get<Parcel>(`${this.baseUrl}/${id}`);
  }

  deleteParcel(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateParcelStatus(id: number, status: string, currentHub: string): Observable<Parcel> {
    // JSON Server doesn't support custom routes like /status
    return this.http.patch<Parcel>(`${this.baseUrl}/${id}`, { status, currentHub });
  }

  trackParcel(trackingId: string): Observable<Parcel[]> {
    return this.http.get<Parcel[]>(`${this.baseUrl}?trackingId=${trackingId}`);
  }

  getByTrackingId(trackingId: string): Observable<Parcel[]> {
    return this.http.get<Parcel[]>(`${this.baseUrl}?trackingId=${trackingId}`);
  }

getParcelsByUserId(userId: number): Observable<Parcel[]> {
  return this.http.get<Parcel[]>(`http://localhost:8080/api/parcels/user/${userId}`);
}


 // -------- Notification APIs --------

  // getEmployerNotifications(employerId: number): Observable<Notification[]> {
  //   return this.http.get<Notification[]>(`${this.baseUrl}/notifications/${employerId}`);
  // }

  // markNotificationAsRead(notificationId: number): Observable<void> {
  //   return this.http.put<void>(`${this.baseUrl}/notifications/${notificationId}/read`, {});
  // }






   // 1. Claim Pickup

  claimPickup(trackingId: string, employeeId: number): Observable<any> {
    const url = `${this.baseUrl2}${trackingId}/claimPickup/${employeeId}`;
    return this.http.put(url, null);
  }

  // 2. Transfer Parcel

  transferParcel(trackingId: string, hubName: string, employeeId: number): Observable<any> {
    const url = `${this.baseUrl2}${trackingId}/transfer`;
    const params = { hubName, employeeId: employeeId.toString() };
    return this.http.post(url, null, { params });
  }

  // 3. Get Tracking History

  getParcelTracking(trackingId: string): Observable<ParcelTrackingDTO[]> {
    const url = `http://localhost:8085/api/parcels/parcel/${trackingId}/tracking`;

    return this.http.get<ParcelTrackingDTO[]>(url);
  }

 

  // Parcel receive/save by employee
  // receiveParcel(parcelId: number, employeeId: number, employeeName: string, currentHub: string): Observable<Parcel> {
  //   return this.http.post<Parcel>(`${this.baseUrl}/${parcelId}/receive?employeeId=${employeeId}&employeeName=${employeeName}&currentHub=${currentHub}`, {});
  // }


}
