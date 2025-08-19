import { Injectable } from '@angular/core';
import { HubTransfer } from '../../model/transferHub.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap, throwError } from 'rxjs';
import { TransferHub } from '../transfer-hub/transfer-hub';
import { RecParcelEmpDetModel } from '../../model/recParcelByEmpDet.modek';

@Injectable({
  providedIn: 'root'
})
export class TransferHubService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getLatestHub(id: string): Observable<HubTransfer> {
    return this.http.get<HubTransfer>(`${this.apiUrl}/transfer_Hub/latest/${id}`);
  }

  getHistory(parcelId: string): Observable<HubTransfer[]> {
    return this.http.get<HubTransfer[]>(`${this.apiUrl}/transfer_Hub/history/${parcelId}`);
  }

  saveTransfer(transferHub: HubTransfer): Observable<HubTransfer> {
    return this.http.post<HubTransfer>(`${this.apiUrl}/transfer_Hub`, transferHub);
  }

  // Corrected: fetch record by parcelId and patch by id
  updateParcelCurrentHub(parcelId: string, hubId: string) {
    return this.http.get<RecParcelEmpDetModel[]>(`${this.apiUrl}/recParcelEmpDet?parcelId=${parcelId}`)
      .pipe(
        switchMap(records => {
          if (records.length === 0) {
            return throwError(() => new Error('Parcel not found'));
          }
          const record = records[0];
          return this.http.patch(`${this.apiUrl}/recParcelEmpDet/${record.id}`, { currentHub: hubId });
        })
      );
  }

  // Return the first matched record or null if none found
  getReceivedParcelById(parcelId: string): Observable<RecParcelEmpDetModel | null> {
    return this.http.get<RecParcelEmpDetModel[]>(`${this.apiUrl}/recParcelEmpDet?parcelId=${parcelId}`)
      .pipe(
        map(records => records.length > 0 ? records[0] : null)
      );
  }



}