import { TestBed } from '@angular/core/testing';

import { InsuranceStoreService } from './insurance-store.service';

describe('InsuranceStoreService', () => {
  let service: InsuranceStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
