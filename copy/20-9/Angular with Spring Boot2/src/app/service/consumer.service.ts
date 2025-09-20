import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable, tap, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './auth.service';
import { User } from '../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {

  private baseUrl=environment.apiBaseUrl+'/consumer/';

  constructor(private http: HttpClient, private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  registerConsumer(user:any, consumer:any,photo:File):Observable<any>{
    const formData= new FormData();
    formData.append('user', JSON.stringify(user));
    formData.append('consumer', JSON.stringify(consumer));
    formData.append('photo', photo);

    return this.http.post(this.baseUrl, formData);
  }

    // 2️⃣ Get All Consumer
  getAllConsumer(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'all');
  }



  getProfile(): Observable<any> {
    let headers = new HttpHeaders();

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
        console.log(headers);
      }
    }
    return this.http.get<any>(this.baseUrl + 'profile', { headers });
  }


   getConsumerProfileById(): Observable<User> {
      let headers = new HttpHeaders();
  
      if (isPlatformBrowser(this.platformId)) {
        const token = localStorage.getItem('authToken');
        if (token) {
          headers = headers.set('Authorization', 'Bearer ' + token);
          console.log(headers);
        }
      }
  
      return this.http.get<User>(`${environment.apiBaseUrl}/consumer/profile`, { headers });
    }
      // ✅ Consumer ID আনার মেথড
 getMyConsumerId(): Observable<number> {
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

  return this.http.get<number>('http://localhost:8085/api/consumer/my-id', { headers }).pipe(
    tap(consumerId => {
      if (isPlatformBrowser(this.platformId) && consumerId) {
        localStorage.setItem('consumerId', consumerId.toString());
        console.log("consumerId ID saved ");
        console.log(localStorage.getItem('consumerId'));
      }
    })
  );
}
}