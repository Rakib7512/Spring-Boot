import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../../model/country.module';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
     private baseUrl=environment.apiBaseUrl+'/country/';

  constructor(private http:HttpClient) { }
  getAll(): Observable<Country[]> {
      return this.http.get<Country[]>(this.baseUrl);
    }
  
    add(policeStation: Country): Observable<Country> {
      return this.http.post<Country>(this.baseUrl, policeStation);
  
    }
  
    update(policeStation: Country): Observable<Country> {
      return this.http.put<Country>(`${this.baseUrl}/${policeStation.id}`, policeStation);
  
    }
    delete(id: string): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl }/${id}`);
  
  
    }
}
