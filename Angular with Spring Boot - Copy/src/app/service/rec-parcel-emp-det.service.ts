import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecParcelEmpDetModel } from '../../model/recParcelByEmpDet.modek';
@Injectable({
  providedIn: 'root'
})
export class RecParcelEmpDetService {

private baseUrl = 'http://localhost:3000/recParcvelEmpDec';
 
  constructor(private http:HttpClient) { }


  saveReceivedParcel(data: any): Observable<any> {
  return this.http.post('http://localhost:3000/recParcvelEmpDec', data);

  
}

geteceivedParcelById(parcelId: string): Observable<any>{
  return this.http.get("http://localhost:3000/recParcvelEmpDec?parcelId="+parcelId)
}

  getAllParcelsDet(): Observable<RecParcelEmpDetModel[]> {
      return this.http.get<RecParcelEmpDetModel[]>(this.baseUrl);
    }
    getByTrackingId(trackingId: string): Observable<RecParcelEmpDetModel[]> {
    return this.http.get<RecParcelEmpDetModel[]>(`${this.baseUrl}?trackingId=${trackingId}`);
  }

  getReceivedParcelById(parcelId: string): Observable<RecParcelEmpDetModel> {
    return this.http.get<RecParcelEmpDetModel>(`${this.baseUrl}/${parcelId}`);
  }
 

}
