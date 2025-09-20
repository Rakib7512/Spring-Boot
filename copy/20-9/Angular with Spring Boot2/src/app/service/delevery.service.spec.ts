import { TestBed } from '@angular/core/testing';

import { DeleveryService } from './delevery.service';

describe('DeleveryService', () => {
  let service: DeleveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
