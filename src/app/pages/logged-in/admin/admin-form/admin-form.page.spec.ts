import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminFormPage } from './admin-form.page';

describe('AdminFormPage', () => {
  let component: AdminFormPage;
  let fixture: ComponentFixture<AdminFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
