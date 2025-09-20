import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPoliceStation } from './add-police-station';

describe('AddPoliceStation', () => {
  let component: AddPoliceStation;
  let fixture: ComponentFixture<AddPoliceStation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPoliceStation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPoliceStation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
