import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { User } from '../../../model/user.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';
import { Parcel } from '../../../model/parcel.model';
import { ParcelService } from '../../service/parcel.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-userprofile',
  standalone: false,
  templateUrl: './userprofile.html',
  styleUrl: './userprofile.css'
})
export class Userprofile implements OnInit {
  user: User | null = null;
  userParcels: Parcel[] = [];
  defaultImage: string = 'https://via.placeholder.com/150'; // fallback image
  selectedImage: string | null = null;

  constructor(
    private parcelService: ParcelService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }


  ngOnInit(): void {
     if (isPlatformBrowser(this.platformId)) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      this.user = JSON.parse(loggedInUser);
      // if (this.user?.id) {
      //   this.loadUserParcels(this.user.id);  // ✅ This line is key
      // }
    } else {
      console.error('User not logged in.');
    }
  }
  }

 loadUserParcels(userId: number): void {
 this.parcelService.getParcelsByUserId(userId).subscribe({
    next: (data) => {
      this.userParcels = data;
    },
    error: (err) => {
      console.error('Failed to load user parcel history:', err);
    }
  }); 
}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfilePic(): void {
    if (this.selectedImage && this.user) {
      this.user.photo = this.selectedImage;
      localStorage.setItem('loggedInUser', JSON.stringify(this.user));
      alert('Profile picture updated!');
    }
  }
}