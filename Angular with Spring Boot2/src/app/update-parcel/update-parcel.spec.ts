import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateParcel } from './update-parcel';

describe('UpdateParcel', () => {
  let component: UpdateParcel;
  let fixture: ComponentFixture<UpdateParcel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateParcel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateParcel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
