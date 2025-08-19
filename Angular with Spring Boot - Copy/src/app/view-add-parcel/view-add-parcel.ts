import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParcelService } from '../service/parcel.service';

@Component({
  selector: 'app-view-add-parcel',
  standalone: false,
  templateUrl: './view-add-parcel.html',
  styleUrl: './view-add-parcel.css'
})
export class ViewAddParcel implements OnInit {
  // parcel!: any;

  // constructor(
  //   private router: Router,
  //   private cdr: ChangeDetectorRef,
  //   private parcelService: ParcelService,

  // ) { }

  ngOnInit(): void {
    // this.loadAddParcel();
  }

  // loadAddParcel() {
  //   this.parcel = this.parcelService.getAllParcels();
  // }

  // updateParcel(id: string): void {
  //   this.router.navigate(['update Parcel', id])


  // }


  // deleteParcel(id: string): void {
  //   this.parcelService.deleteParcel(id).subscribe({
  //     next: (res) => {
  //       console.log("Parcel Delete");
  //       this.cdr.reattach();
  //       this.loadAddParcel();
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   });
  // }





}
