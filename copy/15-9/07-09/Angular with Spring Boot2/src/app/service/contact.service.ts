import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatMessage } from '../../model/contact.model';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

baseUrlChat: string = 'http://localhost:3000/contact'; // Correct URL string

  constructor(private http: HttpClient) { }

  getMessages(): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(this.baseUrlChat);
  }

  sendMessage(message: ChatMessage): Observable<ChatMessage> {
    return this.http.post<ChatMessage>(this.baseUrlChat, message);
  }
}
