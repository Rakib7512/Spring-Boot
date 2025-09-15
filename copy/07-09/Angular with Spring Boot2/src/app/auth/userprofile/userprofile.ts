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
    parcels: Parcel[] = [];
   consumerId!: number; // ✅ এখানে লগইন করা user এর ID বসবে (auth থেকে আনবে)

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
     
    
    // ✅ localStorage থেকে consumerId আনো
    const id = localStorage.getItem('consumerId');
    if (id) {
      this.consumerId = Number(id);
      this.loadParcelHistory();
    } else {
      console.error('Consumer not logged in!');
    }
   
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

   loadParcelHistory(): void {
    this.parcelService.getConsumerParcels(this.consumerId).subscribe({
      next: (data) => {
        this.parcels = data;
      },
      error: (err) => {
        console.error('Error loading parcel history:', err);
      }
    });
  }

  }