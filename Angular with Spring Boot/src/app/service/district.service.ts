import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { District } from '../../model/district.model';
import { PoliceStation } from '../../model/policeStation.model';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  private apiUrl = 'http://localhost:3000/districts'
  constructor(private http: HttpClient) { }

  getAll(): Observable<District[]> {
    return this.http.get<District[]>(this.apiUrl);
  }

  add(policeStation: PoliceStation): Observable<District> {
    return this.http.post<District>(this.apiUrl, policeStation);

  }

  update(policeStation: District): Observable<District> {
    return this.http.put<District>(`${this.apiUrl}/${policeStation.id}`, policeStation);

  }
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);


  }
}
