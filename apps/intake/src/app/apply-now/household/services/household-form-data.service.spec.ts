import { TestBed } from '@angular/core/testing';

import { HouseholdFormDataService } from './household-form-data.service';

describe('HouseholdFormDataService', () => {
  let service: HouseholdFormDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HouseholdFormDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
