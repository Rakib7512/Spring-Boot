import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { User } from '../../model/user.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 private baseUrl=environment.apiBaseUrl+'/user/all';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }


  getAllUser():Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl )
  }


  getUserProfile(): Observable<User | null> {
    return of(this.authService.getUserProfileFromStorage());
  }


    updateUserProfile(user: User): Observable<User> {
    localStorage.setItem('userProfile', JSON.stringify(user));
    return this.http.put<User>(`${this.baseUrl}/${user.id}`, user);
  }
  
  getUserById(id: string): Observable<User> {
  return this.http.get<User>(`/api/users/${id}`);
}

  

}
