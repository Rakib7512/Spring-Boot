import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHubTransfer } from './view-hub-transfer';

describe('ViewHubTransfer', () => {
  let component: ViewHubTransfer;
  let fixture: ComponentFixture<ViewHubTransfer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewHubTransfer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewHubTransfer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
