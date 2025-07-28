import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Division } from '../../model/division.model';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {
  private apiUrl = 'http://localhost:3000/divisions';
  constructor(private http: HttpClient) { }
  
  getAll(): Observable<Division[]> {
    return this.http.get<Division[]>(this.apiUrl);
  }

  add(policeStation: Division): Observable<Division> {
    return this.http.post<Division>(this.apiUrl, policeStation);

  }

  update(policeStation: Division): Observable<Division> {
    return this.http.put<Division>(`${this.apiUrl}/${policeStation.id}`, policeStation);

  }
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);


  }
}
