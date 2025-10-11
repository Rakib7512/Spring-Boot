import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmp } from './view-emp';

describe('ViewEmp', () => {
  let component: ViewEmp;
  let fixture: ComponentFixture<ViewEmp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewEmp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEmp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
