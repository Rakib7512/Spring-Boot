import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReceiveParcel } from './view-receive-parcel';

describe('ViewReceiveParcel', () => {
  let component: ViewReceiveParcel;
  let fixture: ComponentFixture<ViewReceiveParcel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewReceiveParcel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewReceiveParcel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
