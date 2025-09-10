import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDistrict } from './add-district';

describe('AddDistrict', () => {
  let component: AddDistrict;
  let fixture: ComponentFixture<AddDistrict>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDistrict]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDistrict);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
