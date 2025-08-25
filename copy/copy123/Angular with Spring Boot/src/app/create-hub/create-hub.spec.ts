import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHub } from './create-hub';

describe('CreateHub', () => {
  let component: CreateHub;
  let fixture: ComponentFixture<CreateHub>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateHub]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHub);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
