import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayableCandidatesPage } from './payable-candidates.page';

describe('PayableCandidatesPage', () => {
  let component: PayableCandidatesPage;
  let fixture: ComponentFixture<PayableCandidatesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayableCandidatesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayableCandidatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
