import { TestBed } from '@angular/core/testing';

import { RecParcelEmpDetService } from './rec-parcel-emp-det.service';

describe('RecParcelEmpDetService', () => {
  let service: RecParcelEmpDetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecParcelEmpDetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
