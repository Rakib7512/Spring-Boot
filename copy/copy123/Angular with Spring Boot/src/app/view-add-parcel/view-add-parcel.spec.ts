import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAddParcel } from './view-add-parcel';

describe('ViewAddParcel', () => {
  let component: ViewAddParcel;
  let fixture: ComponentFixture<ViewAddParcel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAddParcel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAddParcel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
