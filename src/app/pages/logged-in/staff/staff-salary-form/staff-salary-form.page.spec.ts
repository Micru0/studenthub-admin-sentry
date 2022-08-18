import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StaffSalaryFormPage } from './staff-salary-form.page';

describe('StaffSalaryFormPage', () => {
  let component: StaffSalaryFormPage;
  let fixture: ComponentFixture<StaffSalaryFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffSalaryFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StaffSalaryFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
