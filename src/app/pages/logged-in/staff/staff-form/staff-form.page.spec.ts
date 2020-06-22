import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StaffFormPage } from './staff-form.page';

describe('StaffFormPage', () => {
  let component: StaffFormPage;
  let fixture: ComponentFixture<StaffFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StaffFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
