import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../../model/user.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { AuthResponse } from '../../model/authRespone.model';
import { environment } from '../../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private baseUrl = environment.apiBaseUrl + '/users'; 
  // Spring Boot API: e.g. http://localhost:8085/api/users

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const storedUser = this.isBrowser()
      ? JSON.parse(localStorage.getItem('currentUser') || 'null')
      : null;
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  // Registration
  registration(user: User): Observable<AuthResponse> {
    return this.http.post<User>(this.baseUrl, user).pipe(
      map((newUser: User) => {
        const token = btoa(`${newUser.email}:${newUser.password}`);
        this.storeToken(token);
        this.setCurrentUser(newUser);
        return { token, user: newUser } as AuthResponse;
      }),
      catchError(error => {
        console.error('Registration error:', error);
        return throwError(() => error);
      })
    );
  }

  // Login
  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    let params = new HttpParams().append('email', credentials.email);

    return this.http.get<User[]>(this.baseUrl, { params }).pipe(
      map(users => {
        if (users.length > 0) {
          const user = users[0];
          if (user.password === credentials.password) {
            const token = btoa(`${user.email}:${user.password}`);
            this.storeToken(token);
            this.setCurrentUser(user);
            return { token, user } as AuthResponse;
          } else {
            throw new Error('Invalid password');
          }
        } else {
          throw new Error('User not found');
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => error);
      })
    );
  }

  // Token store
  storeToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('token', token);
    }
  }

  // Set current user in localStorage & BehaviorSubject
 private setCurrentUser(user: User): void {
  if (this.isBrowser()) {
    localStorage.setItem('currentUser', JSON.stringify(user));

    // null-safe check for id
    if (user.id != null) {  // null এবং undefined দুইটাই চেক করবে
      localStorage.setItem('userId', user.id.toString());
    }
  }
  this.currentUserSubject.next(user);
}

  

  // Logout
  logout(): void {
    this.clearCurrentUser();
    if (this.isBrowser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    }
  }

  private clearCurrentUser(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }

  removeUserDetails(): void {
    if (this.isBrowser()) {
      localStorage.clear();
    }
  }

  // Get role
  getUserRole(): string | null {
    return this.currentUserValue?.role || null;
  }

  // Get current user value
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  // Token getter
  getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem('token') : null;
  }

  // Auth check
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Store profile
  storeUserProfile(user: User): void {
    if (this.isBrowser()) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  // Get profile
  getUserProfileFromStorage(): User | null {
    if (this.isBrowser()) {
      const userProfile = localStorage.getItem('currentUser');
      return userProfile ? JSON.parse(userProfile) : null;
    }
    return null;
  }

  // Role checks
  isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }

  isUser(): boolean {
    return this.getUserRole() === 'CONSUMER';
  }

  isEmp(): boolean {
    return this.getUserRole() === 'EMPLOYEE';
  }

  // Get logged-in user from backend
  getLoggedInUser(): Observable<User> {
    if (this.isBrowser()) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        return this.http.get<User>(`${this.baseUrl}/${userId}`);
      }
    }
    return throwError(() => new Error('localStorage not available or user not logged in.'));
  }
}