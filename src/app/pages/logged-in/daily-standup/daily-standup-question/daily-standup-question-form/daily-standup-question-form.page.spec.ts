import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DailyStandupQuestionFormPage } from './daily-standup-question-form.page';

describe('DailyStandupQuestionFormPage', () => {
  let component: DailyStandupQuestionFormPage;
  let fixture: ComponentFixture<DailyStandupQuestionFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyStandupQuestionFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DailyStandupQuestionFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
