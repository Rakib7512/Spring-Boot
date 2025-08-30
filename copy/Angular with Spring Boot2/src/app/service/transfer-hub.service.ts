import { Injectable } from '@angular/core';
import { HubTransfer } from '../../model/transferHub.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap, throwError } from 'rxjs';
import { TransferHub } from '../transfer-hub/transfer-hub';
import { RecParcelEmpDetModel } from '../../model/recParcelByEmpDet.modek';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TransferHubService {

  private apiUrl=environment.apiBaseUrl+'/parcels/parcel/';
  constructor(private http: HttpClient) { }



  transferParcel(trackingId: string, hubName: string, employeeId: number): Observable<string> {
    const url = `${this.apiUrl}/${trackingId}/transfer`;
    return this.http.post<string>(url, null, {
      params: { hubName, employeeId: employeeId.toString() },
    });
  }

  getParcelDetails(trackingId: string): Observable<any> {
    return this.http.get<any>('http://localhost:8085/api/parcels/tracking/' + trackingId);
  }
}