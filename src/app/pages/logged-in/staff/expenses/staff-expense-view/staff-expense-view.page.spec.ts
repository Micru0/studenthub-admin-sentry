import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StaffExpenseViewPage } from './staff-expense-view.page';

describe('StaffExpenseViewPage', () => {
  let component: StaffExpenseViewPage;
  let fixture: ComponentFixture<StaffExpenseViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffExpenseViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StaffExpenseViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
