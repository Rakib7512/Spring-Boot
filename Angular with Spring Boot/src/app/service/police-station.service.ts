import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { PoliceStation } from '../../model/policeStation.model';

@Injectable({
  providedIn: 'root'
})
export class PoliceStationService {
private baseUrl=environment.apiBaseUrl+'/policestation/';

  constructor(private http:HttpClient) { }
getAll(): Observable<PoliceStation[]> {
    return this.http.get<PoliceStation[]>(this.baseUrl);
  }

  // ID দিয়ে একটি Police Station আনবে
  getById(id: string): Observable<PoliceStation> {
    return this.http.get<PoliceStation>(`${this.baseUrl}/${id}`);
  }

  // নতুন Police Station যোগ করবে
  add(policeStation: Partial<PoliceStation>): Observable<PoliceStation> {
    return this.http.post<PoliceStation>(this.baseUrl, policeStation);
  }

  // Police Station আপডেট করবে
  update(policeStation: PoliceStation): Observable<PoliceStation> {
    return this.http.put<PoliceStation>(`${this.baseUrl}/${policeStation.id}`, policeStation);
  }

  // Police Station ডিলিট করবে
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}