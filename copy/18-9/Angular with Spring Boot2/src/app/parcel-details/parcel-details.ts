import { Component, OnInit } from '@angular/core';
import { Parcel } from '../../model/parcel.model';
import { ActivatedRoute } from '@angular/router';
import { ParcelService } from '../service/parcel.service';
import { Country } from '../../model/country.module';
import { CountryService } from '../service/country.service';

@Component({
  selector: 'app-parcel-details',
  standalone: false,
  templateUrl: './parcel-details.html',
  styleUrl: './parcel-details.css'
})
export class ParcelDetails implements OnInit {
  
  parcel!: Parcel;
  parcelId!: string;

  countries: Country[] = [];

  constructor(
    private route: ActivatedRoute,
    private parcelService: ParcelService,
    private countryService: CountryService
  ) {}



  ngOnInit(): void {

    this.countryService.getAll().subscribe(data => this.countries = data);
    this.route.queryParams.subscribe(params => {
      this.parcelId = params['trackingId'];
      if (this.parcelId) {
        this.getParcelDetails(this.parcelId);
      }
    });
  }
  getParcelDetails(id: string) {
    this.parcelService.getByTrackingId(id).subscribe(data => {
      this.parcel = data[0];
    });
  }
  




  getNameById(list: any[], id: any): string {
  const item = list.find(i => i.id === id);
  return item ? item.name : '';
}

}
