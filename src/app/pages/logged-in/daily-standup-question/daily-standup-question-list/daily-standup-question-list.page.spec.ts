import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DailyStandupQuestionListPage } from './daily-standup-question-list.page';

describe('DailyStandupQuestionListPage', () => {
  let component: DailyStandupQuestionListPage;
  let fixture: ComponentFixture<DailyStandupQuestionListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyStandupQuestionListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DailyStandupQuestionListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
