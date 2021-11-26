import { TestBed } from '@angular/core/testing';

import { RequestChecklistService } from './request-checklist.service';

describe('RequestChecklistService', () => {
  let service: RequestChecklistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestChecklistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
