import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConsumer } from './add-consumer';

describe('AddConsumer', () => {
  let component: AddConsumer;
  let fixture: ComponentFixture<AddConsumer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddConsumer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddConsumer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
