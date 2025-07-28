import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Parcel } from '../../model/parcel.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParcelService {

 private baseUrl = 'http://localhost:3000/parcel'; // JSON Server expects plural

  constructor(private http: HttpClient) {}

  saveParcel(parcel: Parcel): Observable<Parcel> {
    return this.http.post<Parcel>(this.baseUrl, parcel);
  }

  getAllParcels(): Observable<Parcel[]> {
    return this.http.get<Parcel[]>(this.baseUrl);
  }

  updateParcel(id: string, parcel: Parcel): Observable<Parcel> {
    return this.http.put<Parcel>(`${this.baseUrl}/${id}`, parcel);
  }

  patchParcel(id: string, partial: Partial<Parcel>): Observable<Parcel> {
    return this.http.patch<Parcel>(`${this.baseUrl}/${id}`, partial);
  }

  getParcelById(id: string): Observable<Parcel> {
    return this.http.get<Parcel>(`${this.baseUrl}/${id}`);
  }

  deleteParcel(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateParcelStatus(id: string, status: string, currentHub: string): Observable<Parcel> {
    // JSON Server doesn't support custom routes like /status
    return this.http.patch<Parcel>(`${this.baseUrl}/${id}`, { status, currentHub });
  }

  trackParcel(trackingId: string): Observable<Parcel[]> {
    return this.http.get<Parcel[]>(`${this.baseUrl}?trackingId=${trackingId}`);
  }

  getByTrackingId(trackingId: string): Observable<Parcel[]> {
    return this.http.get<Parcel[]>(`${this.baseUrl}?trackingId=${trackingId}`);
  }

getParcelsByUserId(userId: string): Observable<Parcel[]> {
  return this.http.get<Parcel[]>(`http://localhost:8080/api/parcels/user/${userId}`);
}


}
