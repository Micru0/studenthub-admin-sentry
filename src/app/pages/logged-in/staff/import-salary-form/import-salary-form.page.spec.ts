import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImportSalaryFormPage } from './import-salary-form.page';

describe('ImportSalaryFormPage', () => {
  let component: ImportSalaryFormPage;
  let fixture: ComponentFixture<ImportSalaryFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportSalaryFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImportSalaryFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
