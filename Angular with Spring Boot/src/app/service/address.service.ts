import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

private baseUrl = environment.apiBaseUrl  // Spring Boot URL

    constructor(private http: HttpClient) { }

    getCountries(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/countries/`);
    }

    getDivisionsByCountry(countryId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/division/by-country/${countryId}`);
    }

    getDistrictsByDivision(divisionId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/district/by-division/${divisionId}`);
    }

    getPoliceStationsByDistrict(districtId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/policestation/by-district/${districtId}`);
    }

    // Save address
    saveAddress(address: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/addresses`, address);
    }

    getAllAddresses(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/addresses`);
    }


}
