import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParcelService } from '../service/parcel.service';
import { Parcel } from '../../model/parcel.model';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-view-add-parcel',
  standalone: false,
  templateUrl: './view-add-parcel.html',
  styleUrl: './view-add-parcel.css'
})
export class ViewAddParcel implements OnInit {
 parcels: Parcel[] = [];
  loading: boolean = true;
  errorMessage: string = '';
  selectedParcel: Parcel | null = null;

  constructor(private parcelService: ParcelService, private router: Router) {}

  ngOnInit(): void {
    this.loadParcels();
  }

  // Fetch parcels from backend
  loadParcels() {
    this.parcelService.getAllParcels().subscribe({
      next: (data) => {
        this.parcels = data;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Failed to load parcels.';
        this.loading = false;
      }
    });
  }

  // Open modal to view details
  viewParcel(parcel: Parcel) {
    this.selectedParcel = parcel;
    const modal = document.getElementById('parcelDetailsModal');
    if (modal) {
      (modal as any).style.display = 'block';
    }
  }

  // Close modal
  closeModal() {
    const modal = document.getElementById('parcelDetailsModal');
    if (modal) {
      (modal as any).style.display = 'none';
    }
    this.selectedParcel = null;
  }

  // Navigate to update page
updateParcel(id: number | undefined) {
  if (!id) {
    alert('Parcel ID is missing!');
    return;
  }
  this.router.navigate(['/updateparcel', id]);
}

deleteParcel(id: number | undefined) {
  if (!id) {
    alert('Parcel ID is missing!');
    return;
  }
  if (confirm('Are you sure you want to delete this parcel?')) {
    this.parcelService.deleteParcel(id).subscribe({
      next: () => {
        alert('Parcel deleted successfully!');
        this.loadParcels();
      },
      error: (err) => {
        console.error('Failed to delete parcel', err);
        alert('Failed to delete parcel');
      }
    });
  }
}


//  getParcelById(): Observable<Parcel> {
//     let headers = new HttpHeaders();

//     this.selectedParcel = Parcel;
//     const modal = document.getElementById('parcelDetailsModal');
//     if (modal) {
//       (modal as any).style.display = 'block';
//     }

//     return this.http.get<Parcel>(`${environment.apiBaseUrl}/pa/profile`, { headers });
//   }
}