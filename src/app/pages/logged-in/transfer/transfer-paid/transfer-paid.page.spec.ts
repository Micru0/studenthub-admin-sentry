import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransferPaidPage } from './transfer-paid.page';

describe('TransferPaidPage', () => {
  let component: TransferPaidPage;
  let fixture: ComponentFixture<TransferPaidPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferPaidPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransferPaidPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
