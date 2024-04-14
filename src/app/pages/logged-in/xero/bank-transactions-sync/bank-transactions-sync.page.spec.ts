import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BankTransactionsSyncPage } from './bank-transactions-sync.page';

describe('BankTransactionsSyncPage', () => {
  let component: BankTransactionsSyncPage;
  let fixture: ComponentFixture<BankTransactionsSyncPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BankTransactionsSyncPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BankTransactionsSyncPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
