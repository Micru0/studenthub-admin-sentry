import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CanEvalQuesDeptFormPage } from './can-eval-ques-dept-form.page';

describe('CanEvalQuesDeptFormPage', () => {
  let component: CanEvalQuesDeptFormPage;
  let fixture: ComponentFixture<CanEvalQuesDeptFormPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CanEvalQuesDeptFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CanEvalQuesDeptFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
