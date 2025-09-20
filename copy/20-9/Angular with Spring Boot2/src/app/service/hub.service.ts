import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hub } from '../../model/hub.model';

@Injectable({
  providedIn: 'root'
})
export class HubService {

   private apiUrl = 'http://localhost:3000/hubList'; // or your backend API

  constructor(private http: HttpClient) {}

  getAllHubs(): Observable<Hub[]> {
    return this.http.get<Hub[]>(this.apiUrl);
  }

  addHub(hub: Hub): Observable<Hub> {
    return this.http.post<Hub>(this.apiUrl, hub);
  }

  deleteHub(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  saveHub(hub: Hub): Observable<Hub> {
    return this.http.post<Hub>(this.apiUrl, hub);
  }
   updateHub(hub: Hub): Observable<Hub> {
      return this.http.put<Hub>(`${this.apiUrl}/${hub.id}`, hub);
  
    }
  

  
}
