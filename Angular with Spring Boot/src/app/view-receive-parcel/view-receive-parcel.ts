import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecParcelEmpDetService } from '../service/rec-parcel-emp-det.service';
import { Parcel } from '../../model/parcel.model';
import { User } from '../../model/user.model';
import { NotificationService } from '../service/notification.service';
import { ParcelService } from '../service/parcel.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-view-receive-parcel',
  standalone: false,
  templateUrl: './view-receive-parcel.html',
  styleUrl: './view-receive-parcel.css'
})
export class ViewReceiveParcel implements OnInit {
notifications: Notification[] = [];
  selectedParcel?: Parcel;
  user?: User;

  constructor(
    private notificationService: NotificationService,
    private parcelService: ParcelService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // this.user = this.authService.currentUserValue;

  //   if (this.user) {
  //     this.loadNotifications();
  //   }
  // }

  // loadNotifications() {
  //   this.notificationService.getNotifications(this.user!.id).subscribe(
  //     data => this.notifications = data
  //   );
  // }

  // viewParcel(notification: Notification) {
  //   this.parcelService.getParcelById(notification.id).subscribe(
  //     data => this.selectedParcel = data
  //   );

  //   // Optionally mark notification as read
  //   this.notificationService.markAsRead(notification.id).subscribe();
  // }

  // saveReceivedParcel() {
  //   if (!this.selectedParcel || !this.user) return;

  //   this.parcelService.receiveParcel(
  //     this.selectedParcel.id,
  //     this.user.id,
  //     this.user.name,
  //     this.user.currentHub
  //   ).subscribe(
  //     res => {
  //       alert('Parcel received successfully by ' + this.user!.name);
  //       this.selectedParcel = res;
  //       this.loadNotifications(); // refresh notifications
  //     },
  //     err => alert('Error receiving parcel')
  //   );
  // }
  }}
