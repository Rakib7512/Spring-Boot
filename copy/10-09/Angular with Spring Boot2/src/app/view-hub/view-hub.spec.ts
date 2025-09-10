import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHub } from './view-hub';

describe('ViewHub', () => {
  let component: ViewHub;
  let fixture: ComponentFixture<ViewHub>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewHub]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewHub);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
