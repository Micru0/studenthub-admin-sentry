import { TestBed } from '@angular/core/testing';

import { BlockedIpService } from './blocked-ip.service';

describe('BlockedIpService', () => {
  let service: BlockedIpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockedIpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
