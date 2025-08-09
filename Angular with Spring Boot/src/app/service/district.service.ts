import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { District } from '../../model/district.model';
import { PoliceStation } from '../../model/policeStation.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {
private baseUrl=environment.apiBaseUrl+'/district/';
  constructor(private http: HttpClient) { }

  getAll(): Observable<District[]> {
    return this.http.get<District[]>(this.baseUrl);
  }

  add(policeStation: PoliceStation): Observable<District> {
    return this.http.post<District>(this.baseUrl, policeStation);

  }

  update(policeStation: District): Observable<District> {
    return this.http.put<District>(`${this.baseUrl}/${policeStation.id}`, policeStation);

  }
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);


  }
}
