import { TestBed } from '@angular/core/testing';

import { Transfer.FileService } from './transfer.file.service';

describe('Transfer.FileService', () => {
  let service: Transfer.FileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Transfer.FileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
