import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../../model/employee.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
   private baseUrl=environment.apiBaseUrl+'/employee/';
 
   constructor(private http:HttpClient) { }
 
   registerEmployee(user:any, employee:any,photo:File):Observable<any>{
     const formData= new FormData();
     formData.append('user', JSON.stringify(user));
     formData.append('employee', JSON.stringify(employee));
     formData.append('photo', photo);
 
     return this.http.post(this.baseUrl, formData);
   }
  }