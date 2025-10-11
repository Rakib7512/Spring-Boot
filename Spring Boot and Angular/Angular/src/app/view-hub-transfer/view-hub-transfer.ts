import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransferHubService } from '../service/transfer-hub.service';

@Component({
  selector: 'app-view-hub-transfer',
  standalone: false,
  templateUrl: './view-hub-transfer.html',
  styleUrl: './view-hub-transfer.css'
})
export class ViewHubTransfer implements OnInit {




  hubTransfer!: any;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private hubTransferService: TransferHubService,

  ) { }
  ngOnInit(): void {
    // this. getLatestHub()
  }

  //  getHistory(id:string) {
  //   this.hubTransfer = this.hubTransferService.getHistory(id);
  // }

  //  getLatestHub() {
  //   this.hubTransfer = this.hubTransferService.getLatestHub;
  // }

  updateParcel(id: string): void {
    this.router.navigate(['update Parcel', id])


  }


  
  

}
