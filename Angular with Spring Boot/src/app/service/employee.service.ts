import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../../model/employee.model';
import { environment } from '../../environment/environment';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
   private baseUrl=environment.apiBaseUrl+'/employee/';
 
    constructor(private http: HttpClient, private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object) { }


 
   registerEmployee(user:any, employee:any,photo:File):Observable<any>{
     const formData= new FormData();
     formData.append('user', JSON.stringify(user));
     formData.append('employee', JSON.stringify(employee));
     formData.append('photo', photo);
 
 
     return this.http.post(this.baseUrl, formData);
   }

    // 2️⃣ Get All Employers
  getAllEmployers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'all');
  }


 getEmployeeProfileById(): Observable<Employee> {
    let headers = new HttpHeaders();

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
        console.log(headers);
      }
    }

    return this.http.get<Employee>(`${environment.apiBaseUrl}/employee/profile`, { headers });
  }



 

  }