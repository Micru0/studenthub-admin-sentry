import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SuspiciousTransferListPage } from './suspicious-transfer-list.page';

describe('SuspiciousTransferListPage', () => {
  let component: SuspiciousTransferListPage;
  let fixture: ComponentFixture<SuspiciousTransferListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspiciousTransferListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SuspiciousTransferListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
