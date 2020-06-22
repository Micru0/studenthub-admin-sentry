import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CandidatePaymentSearchPage } from './candidate-payment-search.page';

describe('CandidatePaymentSearchPage', () => {
  let component: CandidatePaymentSearchPage;
  let fixture: ComponentFixture<CandidatePaymentSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidatePaymentSearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CandidatePaymentSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
