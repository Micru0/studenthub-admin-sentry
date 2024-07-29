import { TestBed } from '@angular/core/testing';

import { DegreeGroupService } from './degree-group.service';

describe('DegreeGroupService', () => {
  let service: DegreeGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DegreeGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
