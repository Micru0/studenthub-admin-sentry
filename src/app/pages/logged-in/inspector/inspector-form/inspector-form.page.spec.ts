import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InspectorFormPage } from './inspector-form.page';

describe('InspectorFormPage', () => {
  let component: InspectorFormPage;
  let fixture: ComponentFixture<InspectorFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectorFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InspectorFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
