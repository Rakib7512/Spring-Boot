import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelReqDetails } from './parcel-req-details';

describe('ParcelReqDetails', () => {
  let component: ParcelReqDetails;
  let fixture: ComponentFixture<ParcelReqDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParcelReqDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParcelReqDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
