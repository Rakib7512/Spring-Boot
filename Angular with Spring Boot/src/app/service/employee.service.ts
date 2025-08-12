import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/employees';
  constructor(private http: HttpClient) { }
  
  getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  saveEmployee(Employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, Employee);

  }

  updateEmployee(Employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${Employee.id}`, Employee);

  }
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);


  }
  
 getEmpById(id: number): Observable<Employee> {
  return this.http.get<Employee>(`${this.apiUrl}/${id}`);
}
}
