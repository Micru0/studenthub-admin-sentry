import { TestBed } from '@angular/core/testing';

import { DailyStandupQuestionService } from './daily-standup-question.service';

describe('DailyStandupQuestionService', () => {
  let service: DailyStandupQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyStandupQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
