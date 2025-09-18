import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleveryService {


  private apiUrl=environment.apiBaseUrl+'/parcels/parcel';
  constructor(private http: HttpClient) { }



  delevery(trackingId: string, hubName: string, employeeId: number): Observable<string> {
    const url = `${this.apiUrl}/${trackingId}/delevery`;
    return this.http.post<string>(url, null, {
      params: { hubName, employeeId: employeeId.toString() },
    });
  }




  

  getParcelDetails(trackingId: string): Observable<any> {
    return this.http.get<any>('http://localhost:8085/api/parcels/parcel/' + trackingId + '/delevery');
  }



  getParcelDetailsForTransfer(trackingId: string): Observable<any> {
    return this.http.get<any>('http://localhost:8085/api/parcels/delevery/' + trackingId);
  }



}

