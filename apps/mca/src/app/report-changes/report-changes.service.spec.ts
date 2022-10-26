import { TestBed } from '@angular/core/testing';

import { ReportChangesService } from './report-changes.service';

describe('ReportChangesService', () => {
  let service: ReportChangesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportChangesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
