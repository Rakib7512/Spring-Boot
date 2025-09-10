import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { User } from '../../../model/user.model';
import { Parcel } from '../../../model/parcel.model';
import { ParcelService } from '../../service/parcel.service';
import { isPlatformBrowser } from '@angular/common';
import { UserService } from '../../service/user.service';
import { ConsumerService } from '../../service/consumer.service';

@Component({
  selector: 'app-userprofile',
  standalone: false,
  templateUrl: './userprofile.html',
  styleUrl: './userprofile.css'
})
export class Userprofile implements OnInit {
  
  profile: any = null;
  loading = true;
  error = '';

  imageBaseUrl: string = 'http://localhost:8085/images/consumer/';

  constructor(
    private parcelService: ParcelService,
    private consumerService: ConsumerService,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {

    this.getProfile();
   
  }



  getProfile() {
    this.consumerService.getConsumerProfileById().subscribe({
      next: (data) => {
        this.profile = data;

        console.log(this.profile);
        this.cdr.markForCheck();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load profile ❌';
        console.error(err);
        this.loading = false;
      }
    });
  }





  // loadUserParcels(userId: number): void {
  //   this.parcelService.getParcelsByUserId(userId).subscribe({
  //     next: (data) => {
  //       this.userParcels = data;
  //       this.cdr.detectChanges();
  //     },
  //     error: (err) => {
  //       console.error('Failed to load user parcel history:', err);
  //     }
  //   });
  // }

  // onFileSelected(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.selectedImage = reader.result as string;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  // saveProfilePic(): void {
  //   if (this.selectedImage && this.user) {
  //     this.user.photo = this.selectedImage;
  //     localStorage.setItem('loggedInUser', JSON.stringify(this.user));
  //     alert('Profile picture updated!');
  //   }
  // }
}