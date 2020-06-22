import { TestBed } from '@angular/core/testing';

import { Candidate.TransferService } from './candidate.transfer.service';

describe('Candidate.TransferService', () => {
  let service: Candidate.TransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Candidate.TransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
