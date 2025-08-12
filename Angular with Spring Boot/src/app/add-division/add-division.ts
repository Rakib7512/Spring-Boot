import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { District } from '../../model/district.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DivisionService } from '../service/division.service';
import { DistrictService } from '../service/district.service';
import { Division } from '../../model/division.model';
import { PoliceStation } from '../../model/policeStation.model';
import { console } from 'inspector';
import { Country } from '../../model/country.module';
import { CountryService } from '../service/country.service';

@Component({
  selector: 'app-add-division',
  standalone: false,
  templateUrl: './add-division.html',
  styleUrl: './add-division.css'
})
export class AddDivision implements OnInit {
   divisions: Division[] = [];
   countries: Country[] = [];
  divisionForm!: FormGroup;
  editMode = false;
  currentDivisionId?: number;

  constructor(
    private divisionService: DivisionService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private countryService: CountryService, // Inject country service
  ) { }

  ngOnInit(): void {
    this.loadCountries();
    this.loadDivisions();

    this.divisionForm = this.fb.group({
      name: ['', Validators.required],
      country: this.fb.group({
        id: [null, Validators.required]
      })
    });
  }

  loadCountries(): void {
    this.countryService.getAll().subscribe(data => {
      this.countries = data;
      this.cdr.markForCheck();
    });
  }

  loadDivisions(): void {
    this.divisionService.getAll().subscribe(data => {
      this.divisions = data;
      this.cdr.markForCheck();
    });
  }

  onSubmit(): void {
    if (this.divisionForm.invalid) return;

    const division: Division = this.divisionForm.value;

    if (this.editMode && this.currentDivisionId != null) {
      this.divisionService.update(this.currentDivisionId, division).subscribe(() => {
        this.loadDivisions();
        this.resetForm();
      });
    } else {
      this.divisionService.create(division).subscribe(() => {
        this.loadDivisions();
        this.resetForm();
      });
    }
  }

  onEdit(division: Division): void {
    this.editMode = true;
    this.currentDivisionId = division.id;
    this.divisionForm.patchValue({
      name: division.name,
      country: { id: division.country?.id }
    });
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this division?')) {
      this.divisionService.delete(id).subscribe(() => {
        this.loadDivisions();
      });
    }
  }

  resetForm(): void {
    this.divisionForm.reset();
    this.editMode = false;
    this.currentDivisionId = undefined;
  }

}