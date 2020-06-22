import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CandidateTransferDetailPage } from './candidate-transfer-detail.page';

describe('CandidateTransferDetailPage', () => {
  let component: CandidateTransferDetailPage;
  let fixture: ComponentFixture<CandidateTransferDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateTransferDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CandidateTransferDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
