import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UniversityFormPage } from './university-form.page';

describe('UniversityFormPage', () => {
  let component: UniversityFormPage;
  let fixture: ComponentFixture<UniversityFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversityFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UniversityFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
