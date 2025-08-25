import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewParcel } from './add-new-parcel';

describe('AddNewParcel', () => {
  let component: AddNewParcel;
  let fixture: ComponentFixture<AddNewParcel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewParcel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewParcel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
