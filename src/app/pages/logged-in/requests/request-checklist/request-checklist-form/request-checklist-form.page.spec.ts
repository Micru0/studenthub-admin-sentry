import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RequestChecklistFormPage } from './request-checklist-form.page';

describe('RequestChecklistFormPage', () => {
  let component: RequestChecklistFormPage;
  let fixture: ComponentFixture<RequestChecklistFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestChecklistFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RequestChecklistFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
