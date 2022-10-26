import { TestBed } from '@angular/core/testing';

import { PageQueueService } from './page-queue.service';

describe('PageQueueService', () => {
  let service: PageQueueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageQueueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
