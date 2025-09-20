import { Component, OnInit } from '@angular/core';
import { Hub } from '../../model/hub.model';
import { HubService } from '../service/hub.service';
import { Country } from '../../model/country.module';
import { Division } from '../../model/division.model';
import { District } from '../../model/district.model';
import { PoliceStation } from '../../model/policeStation.model';
import { CountryService } from '../service/country.service';
import { DivisionService } from '../service/division.service';
import { DistrictService } from '../service/district.service';
import { PoliceStationService } from '../service/police-station.service';

@Component({
  selector: 'app-view-hub',
  standalone: false,
  templateUrl: './view-hub.html',
  styleUrl: './view-hub.css'
})
export class ViewHub implements OnInit {

  hubs: Hub[] = [];

  countries: Country[] = [];
  divisions: Division[] = [];
  districts: District[] = [];
  policeStations: PoliceStation[] = [];

  constructor(
    private hubService: HubService,
    private countryService: CountryService,
    private divisionService: DivisionService,
    private districtService: DistrictService,
    private policeStationService: PoliceStationService
  ) {}

  ngOnInit(): void {
    this.loadMasterData();
  }

  loadMasterData() {
    this.countryService.getAll().subscribe(countries => {
      this.countries = countries;
      this.divisionService.getAll().subscribe(divisions => {
        this.divisions = divisions;
        this.districtService.getAll().subscribe(districts => {
          this.districts = districts;
          this.policeStationService.getAll().subscribe(policeStations => {
            this.policeStations = policeStations;
            this.loadHubs();
          });
        });
      });
    });
  }

  loadHubs(): void {
  this.hubService.getAllHubs().subscribe(rawHubs => {
    this.hubs = rawHubs.map(hub => {
      const countryId = String(hub.countryId);
      const divisionId = String(hub.divisionId);
      const districtId = String(hub.districtId);

      // Handle policeStation as either object or string
      let policeStationId: string = '';
      if (typeof hub.policeStationId === 'object' && hub.policeStationId) {
        policeStationId = String(hub.policeStationId);
      } else if (typeof hub.policeStationId === 'string') {
        policeStationId = hub.policeStationId;
      }

      return {
        id: hub.id,
        hubName: hub.hubName,
        countryId: this.countries.find(c => String(c.id) === countryId)?.name || 'Unknown',
        divisionId: this.divisions.find(d => String(d.id) === divisionId)?.name || 'Unknown',
        districtId: this.districts.find(d => String(d.id) === districtId)?.name || 'Unknown',
        policeStationId: this.policeStations.find(p => String(p.id) === policeStationId)?.name || 'Unknown'
      };
    });
  });
}


  deleteHub(id: number): void {
    this.hubService.deleteHub(id).subscribe(() => this.loadHubs());
  }
  

}
