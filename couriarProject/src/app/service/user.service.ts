import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { User } from '../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {


private baseUrl: string = "http://localhost:3000/users";

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}


  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User[]>(`${this.baseUrl}?email=${email}`).pipe(
      map(users => {
        if (users.length > 0) {
          return users[0]; // return matched user
        } else {
          throw new Error('User not found');
        }
      }),
      catchError(error => {
        console.error('Error fetching user:', error);
        return throwError(() => new Error('User not found'));
      })
    );
  }

  getUserProfile(): Observable<User | null> {
    return of(this.authService.getUserProfileFromStorage());
  }

  updateUserProfile(user: User): Observable<User> {
    localStorage.setItem('userProfile', JSON.stringify(user));
    return this.http.put<User>(`${this.baseUrl}/${user.id}`, user);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }
}