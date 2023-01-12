import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DailyStandupAnswerViewPage } from './daily-standup-answer-view.page';

describe('DailyStandupAnswerViewPage', () => {
  let component: DailyStandupAnswerViewPage;
  let fixture: ComponentFixture<DailyStandupAnswerViewPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyStandupAnswerViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DailyStandupAnswerViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
