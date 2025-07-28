import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Division } from '../../model/division.model';
import { CountryService } from '../service/country.service';
import { DivisionService } from '../service/division.service';
import { Directive } from '@angular/compiler';
import { it } from 'node:test';

@Component({
  selector: 'app-add-country',
  standalone: false,
  templateUrl: './add-country.html',
  styleUrl: './add-country.css'
})
export class AddCountry implements OnInit{
  
  countryForm!:FormGroup;
  divisions:Division[]=[];

  constructor(
    private fb:FormBuilder,
    private countryservice:CountryService,
    private divisionService:DivisionService
  ){
    this.countryForm=this.fb.group({
      name:['',Validators.required],
      divisions:[[],Validators.required]
    });
  }
  ngOnInit(): void {
   this.loadDivisions();
  }
  loadDivisions(){
    this.divisionService.getAll().subscribe(data =>{
      this.divisions=data;

    });
  }

  onSubmit(){
    if(this.countryForm.invalid) return;
    const country=this.countryForm.value;
    this.countryservice.add(country).subscribe(()=>{
      alert('Country Add Successful');
      this.countryForm.reset();

    });
  }



}
