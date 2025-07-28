import { Component, OnInit } from '@angular/core';
import { ContactService } from '../service/contact.service';
import { AuthService } from '../service/auth.service';
import { ChatMessage } from '../../model/contact.model';
@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact implements OnInit {
 messages: ChatMessage[] = [];
  newMessage: string = '';
  currentUserName: string = 'Guest'; // fallback

  constructor(
    private chatService: ContactService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
     this.loadMessages();

    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.currentUserName = currentUser.name || currentUser.email || currentUser.role || 'User';
    }
  }
    loadMessages(): void {
    this.chatService.getMessages().subscribe(data => {
      this.messages = data;  // Assign array of ChatMessage properly
    });
   
  }

   sendMessage(): void {
    if (this.newMessage.trim()) {
      const message: ChatMessage = {
        sender: this.currentUserName,
        content: this.newMessage.trim(),
        timestamp: new Date()
      };

      this.chatService.sendMessage(message).subscribe(saved => {
        this.messages.push(saved);  // Add to messages array
        this.newMessage = '';       // Clear input box
      });
    }
  }
}


