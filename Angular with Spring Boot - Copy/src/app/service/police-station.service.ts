import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { PoliceStation } from '../../model/policeStation.model';

@Injectable({
  providedIn: 'root'
})
export class PoliceStationService {
private baseUrl = environment.apiBaseUrl + '/policestation/';



  constructor(private http: HttpClient) {}

  getAll(): Observable<PoliceStation[]> {
    return this.http.get<PoliceStation[]>(this.baseUrl);
  }

  create(ps: PoliceStation): Observable<PoliceStation> {
    return this.http.post<PoliceStation>(this.baseUrl, ps);
  }

  update(id: number, ps: PoliceStation): Observable<PoliceStation> {
    return this.http.put<PoliceStation>(`${this.baseUrl}${id}`, ps);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}`);
  }
}