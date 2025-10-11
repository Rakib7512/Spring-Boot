import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferHub } from './transfer-hub';

describe('TransferHub', () => {
  let component: TransferHub;
  let fixture: ComponentFixture<TransferHub>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransferHub]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferHub);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
