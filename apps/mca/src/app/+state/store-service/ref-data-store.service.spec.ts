import { TestBed } from '@angular/core/testing';

import { RefDataStoreService } from './ref-data-store.service';

describe('RefDataStoreService', () => {
  let service: RefDataStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefDataStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
