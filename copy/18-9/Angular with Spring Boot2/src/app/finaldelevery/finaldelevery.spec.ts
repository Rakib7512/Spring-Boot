import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Finaldelevery } from './finaldelevery';

describe('Finaldelevery', () => {
  let component: Finaldelevery;
  let fixture: ComponentFixture<Finaldelevery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Finaldelevery]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Finaldelevery);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
