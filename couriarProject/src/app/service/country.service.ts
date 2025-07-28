import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../../model/country.module';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
    private apiUrl ='http://localhost:3000/countries'

  constructor(private http:HttpClient) { }
  getAll(): Observable<Country[]> {
      return this.http.get<Country[]>(this.apiUrl);
    }
  
    add(policeStation: Country): Observable<Country> {
      return this.http.post<Country>(this.apiUrl, policeStation);
  
    }
  
    update(policeStation: Country): Observable<Country> {
      return this.http.put<Country>(`${this.apiUrl}/${policeStation.id}`, policeStation);
  
    }
    delete(id: string): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
  
  
    }
}
