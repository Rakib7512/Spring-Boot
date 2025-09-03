import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { User } from '../../../model/user.model';
import { Parcel } from '../../../model/parcel.model';
import { ParcelService } from '../../service/parcel.service';
import { isPlatformBrowser } from '@angular/common';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-userprofile',
  standalone: false,
  templateUrl: './userprofile.html',
  styleUrl: './userprofile.css'
})
export class Userprofile implements OnInit {
  id!: number;
  user!: User;
  userParcels: Parcel[] = [];
  defaultImage: string = 'https://via.placeholder.com/150';
  selectedImage: string | null = null;
  imageBaseUrl: string = 'http://localhost:8085/images/users/';

  constructor(
    private parcelService: ParcelService,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // ✅ Fetch logged-in user ID from localStorage
      const loggedInUserId = Number(localStorage.getItem('employeeId'));
      console.log(loggedInUserId);

      if (!loggedInUserId) {
        console.error('No logged-in user found!');
        return;
      }

      // ✅ Fetch user profile
      this.userService.getUserById(loggedInUserId + 1).subscribe({
        next: (data) => {
          this.user = data;
          console.log(data)
          this.cdr.markForCheck();
          // ✅ Load user parcel history
          this.loadUserParcels(loggedInUserId);
        },
        error: (err) => {
          console.error('Failed to fetch user:', err);
        }
      });
    }
  }

  loadUserParcels(userId: number): void {
    this.parcelService.getParcelsByUserId(userId).subscribe({
      next: (data) => {
        this.userParcels = data;
        this.cdr.detectChanges();
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