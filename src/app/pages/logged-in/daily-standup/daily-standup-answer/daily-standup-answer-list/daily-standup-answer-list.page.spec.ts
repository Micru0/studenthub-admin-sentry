import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DailyStandupAnswerListPage } from './daily-standup-answer-list.page';

describe('DailyStandupAnswerListPage', () => {
  let component: DailyStandupAnswerListPage;
  let fixture: ComponentFixture<DailyStandupAnswerListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyStandupAnswerListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DailyStandupAnswerListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
