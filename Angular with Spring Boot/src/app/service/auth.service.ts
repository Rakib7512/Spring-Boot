import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { AuthResponse } from '../../model/authRespone.model';
import { environment } from '../../environment/environment';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private baseUrl = environment.apiBaseUrl + '/user/';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  // user info subject
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;
  // user role subject
private userRoleSubject = new BehaviorSubject<string | null>(null);
public userRole$ = this.userRoleSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const savedUser = this.isBrowser() ? localStorage.getItem('currentUser') : null;
    this.currentUserSubject = new BehaviorSubject<User | null>(savedUser ? JSON.parse(savedUser) : null);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  // getter
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
  const credentials = { email, password };

  return this.http.post<{ token: string }>(`${this.baseUrl}auth/login`, credentials, { headers: this.headers })
    .pipe(
      switchMap(response => {
        // 1. Token decode
        const decodedToken = this.decodeToken(response.token);

        // 2. token থেকে email & role
        const emailFromToken = decodedToken.sub;
        const role = decodedToken.role;

        // 3. token localStorage-এ save করো
        localStorage.setItem('authToken', response.token);

        // 4. backend থেকে full User আনো
        return this.http.get<User>(`${this.baseUrl}users/email/${emailFromToken}`).pipe(
          tap(user => {
            // user কে localStorage এ save করো
            localStorage.setItem('currentUser', JSON.stringify(user));

            // subject update করো
            this.currentUserSubject.next(user);

            // role subject update করো
            this.userRoleSubject.next(user.role);
          })
        );
      }),
      catchError(err => {
        return throwError(() => err);
      })
    );
}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  decodeToken(token: string) {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem('authToken') : null;
  }

  getUserRole(): string | null {
    return this.currentUserValue?.role || null;
  }

  isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    const expiry = decoded.exp * 1000;
    return Date.now() > expiry;
  }

  isLogIn(): boolean {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      return true;
    }
    this.logout();
    return false;
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
    }
    this.router.navigate(['/login']);
  }

  hasRole(roles: string[]): boolean {
    const userRole = this.getUserRole();
    return userRole ? roles.includes(userRole) : false;
  }

  isConsumer(): boolean {
    return this.getUserRole() === 'CONSUMER';
  }

  isEmployee(): boolean {
    return this.getUserRole() === 'EMPLOYEE';
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }

  get isAuthenticated(): boolean {
    return this.isLogIn();
  }
}