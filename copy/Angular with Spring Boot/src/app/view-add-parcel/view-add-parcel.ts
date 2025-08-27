import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParcelService } from '../service/parcel.service';
import { Parcel } from '../../model/parcel.model';

@Component({
  selector: 'app-view-add-parcel',
  standalone: false,
  templateUrl: './view-add-parcel.html',
  styleUrl: './view-add-parcel.css'
})
export class ViewAddParcel implements OnInit {
 parcels: Parcel[] = [];
  errorMessage: string = '';
  selectedParcel: Parcel | null = null;

  constructor(private parcelService: ParcelService, private router: Router) {}

  ngOnInit(): void {
    this.loadParcels();
  }

  loadParcels(): void {
    this.parcelService.getAllParcels().subscribe({
      next: (data) => {
        console.log('Fetched parcels:', data);
        this.parcels = data;
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Failed to load parcels.';
      }
    });
  }

  viewParcel(parcel: Parcel): void {
    this.selectedParcel = parcel;
  }

  closeModal(): void {
    this.selectedParcel = null;
  }

  updateParcel(id: number | undefined): void {
    if (!id) {
      alert('Parcel ID is missing!');
      return;
    }
    this.router.navigate(['/updateparcel', id]);
  }

deleteParcel(id: number | undefined): void {
    if (id === undefined) {
      alert('Parcel ID is missing!');
      return;
    }

    const confirmed = confirm('Are you sure you want to delete this parcel?');
    if (!confirmed) return;

    this.parcelService.deleteParcel(id).subscribe({
      next: () => {
        alert('Parcel deleted successfully!');
        this.loadParcels(); // Refresh the list after deletion
      },
      error: (err) => {
        console.error('Failed to delete parcel', err);
        alert('Failed to delete parcel');
      }
    });
  }
}