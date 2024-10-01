import { TestBed } from '@angular/core/testing';

import { TransferBankAdviceService } from './transfer-bank-advice.service';

describe('TransferBankAdviceService', () => {
  let service: TransferBankAdviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferBankAdviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
