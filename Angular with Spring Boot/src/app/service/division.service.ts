import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Division } from '../../model/division.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {
  private baseUrl=environment.apiBaseUrl+'/division/';
  constructor(private http: HttpClient) { }
  
  getAll(): Observable<Division[]> {
    return this.http.get<Division[]>(this.baseUrl);
  }

  add(policeStation: Division): Observable<Division> {
    return this.http.post<Division>(this.baseUrl, policeStation);

  }

  update(policeStation: Division): Observable<Division> {
    return this.http.put<Division>(`${this.baseUrl}/${policeStation.id}`, policeStation);

  }
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);


  }
}
