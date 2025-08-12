import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Parcel } from '../../model/parcel.model';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ParcelService {

  private baseUrl=environment.apiBaseUrl+'/parcels/';

  constructor(private http: HttpClient) {}

  saveParcel(parcel: Parcel): Observable<Parcel> {
    return this.http.post<Parcel>(this.baseUrl, parcel);
  }

  getAllParcels(): Observable<Parcel[]> {
    return this.http.get<Parcel[]>(this.baseUrl);
  }

  updateParcel(id: number, parcel: Parcel): Observable<Parcel> {
    return this.http.put<Parcel>(`${this.baseUrl}/${id}`, parcel);
  }

  patchParcel(id: number, partial: Partial<Parcel>): Observable<Parcel> {
    return this.http.patch<Parcel>(`${this.baseUrl}/${id}`, partial);
  }

  getParcelById(id: number): Observable<Parcel> {
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


}
