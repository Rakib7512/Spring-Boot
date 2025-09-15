import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDivision } from './add-division';

describe('AddDivision', () => {
  let component: AddDivision;
  let fixture: ComponentFixture<AddDivision>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDivision]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDivision);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
