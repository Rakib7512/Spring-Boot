import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {

  private baseUrl=environment.apiBaseUrl+'/consumer/';

  constructor(private http:HttpClient) { }

  registerConsumer(user:any, consumer:any,photo:File):Observable<any>{
    const formData= new FormData();
    formData.append('user', JSON.stringify(user));
    formData.append('consumer', JSON.stringify(consumer));
    formData.append('photo', photo);

    return this.http.post(this.baseUrl, formData);
  }
}
