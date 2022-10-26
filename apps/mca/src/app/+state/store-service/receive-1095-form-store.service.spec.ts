import { TestBed } from '@angular/core/testing';

import { Receive1095FormStoreService } from './receive-1095-form-store.service';

describe('Receive1095FormStoreService', () => {
  let service: Receive1095FormStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Receive1095FormStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
