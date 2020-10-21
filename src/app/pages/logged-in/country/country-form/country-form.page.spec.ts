import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CountryFormPage } from './country-form.page';

describe('CountryFormPage', () => {
  let component: CountryFormPage;
  let fixture: ComponentFixture<CountryFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CountryFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
