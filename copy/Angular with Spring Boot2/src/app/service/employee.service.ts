import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, tap, throwError } from 'rxjs';
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


  

  deleteEmployee(id: number) {
  return this.http.delete(`/api/employees/${id}`);
}

 // Update employee
  updateEmployee(id: number, employee: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, employee);
  }


  getMyEmployeeId(): Observable<number> {
  if (!isPlatformBrowser(this.platformId)) {
    return throwError(() => new Error('Not running in browser'));
  }

  const token = localStorage.getItem('authToken');
  if (!token) {
    return throwError(() => new Error('No auth token found'));
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.get<number>('http://localhost:8085/api/employee/my-id', { headers }).pipe(
    tap(empId => {
      if (isPlatformBrowser(this.platformId) && empId) {
        localStorage.setItem('employeeId', empId.toString());
        console.log("employee ID saved ");
        console.log(localStorage.getItem('employeeId'));
      }
    })
  );
}





 

  }