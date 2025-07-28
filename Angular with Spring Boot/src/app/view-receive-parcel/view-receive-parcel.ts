import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecParcelEmpDetService } from '../service/rec-parcel-emp-det.service';

@Component({
  selector: 'app-view-receive-parcel',
  standalone: false,
  templateUrl: './view-receive-parcel.html',
  styleUrl: './view-receive-parcel.css'
})
export class ViewReceiveParcel implements OnInit {
  receiveParcel:any[]=[];


  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private reciveParcelReq: RecParcelEmpDetService,

  ) { }
  ngOnInit(): void {
    this.loadAddParcel();
  }

  loadAddParcel() {
   this.reciveParcelReq.getAllParcelsDet().subscribe((res) => {
  this.receiveParcel = res; // ✅ res অবশ্যই Array হতে হবে
})



  }}
