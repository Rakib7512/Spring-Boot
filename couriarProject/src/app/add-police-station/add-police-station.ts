import { Component, OnInit } from '@angular/core';
import { PoliceStation } from '../../model/policeStation.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoliceStationService } from '../service/police-station.service';

@Component({
  selector: 'app-add-police-station',
  standalone: false,
  templateUrl: './add-police-station.html',
  styleUrl: './add-police-station.css'
})
export class AddPoliceStation implements OnInit {

  policeStations: PoliceStation[] = [];
  psForm!: FormGroup;
  editing: boolean = false;
  constructor(
    private formBuildere: FormBuilder,
    private psService: PoliceStationService

  ) {
    this.psForm = this.formBuildere.group({
      id: [''],
      name: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.loadPoliceStation();
  }
  loadPoliceStation() {
    this.psService.getAll().subscribe(data => {
      this.policeStations = data;

    })
  }
  onSubmit() {
    if (this.psForm.invalid) return;

    if (this.editing) {
      this.psService.update(this.psForm.value).subscribe(() => {
        alert('Updated Successful');
        this.loadPoliceStation();
        this.cancelEdit();
      });

    } else {
      const { name } = this.psForm.value;
      this.psService.add({ name }).subscribe(() => {
        alert('Added successfully!');
        this.loadPoliceStation();
        this.psForm.reset();
        this.editing = false;
      });
    }
  }
    getPoliceStationById(id:string){
    this.psService.delete(id);
  }


  editPoliceStation(ps: PoliceStation) {
    this.editing = true;
    this.psForm.patchValue({
      id: ps.id,
      name: ps.name
    });
  }

  deletePoliceStation(id: string) {
      this.psService.delete(id).subscribe(()=>{
        this.loadPoliceStation

      });
  }

  cancelEdit() {
    this.editing = false;
    this.psForm.reset();
  }
}
