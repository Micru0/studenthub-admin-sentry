import { TestBed } from '@angular/core/testing';

import { MailLogService } from './mail-log.service';

describe('MailLogService', () => {
  let service: MailLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
