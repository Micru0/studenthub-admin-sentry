import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CandidateTransferListPage } from './candidate-transfer-list.page';

describe('CandidateTransferListPage', () => {
  let component: CandidateTransferListPage;
  let fixture: ComponentFixture<CandidateTransferListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateTransferListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CandidateTransferListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
