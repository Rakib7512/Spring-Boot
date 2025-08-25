import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user.model';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-all-user',
  standalone: false,
  templateUrl: './all-user.html',
  styleUrl: './all-user.css'
})
export class AllUser implements OnInit{

 users: User[] = [];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUser().subscribe({
      next: (res: User[]) => {
        this.users = res;
        console.log('Users loaded:', this.users); // Debug log
      },
      error: (err) => {
        console.error('Error loading users:', err);
      }
    });
  }

}
