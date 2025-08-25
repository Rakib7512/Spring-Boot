import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParcel } from './add-parcel';

describe('AddParcel', () => {
  let component: AddParcel;
  let fixture: ComponentFixture<AddParcel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddParcel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddParcel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
