import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SuspiciousTransferViewPage } from './suspicious-transfer-view.page';

describe('SuspiciousTransferViewPage', () => {
  let component: SuspiciousTransferViewPage;
  let fixture: ComponentFixture<SuspiciousTransferViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspiciousTransferViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SuspiciousTransferViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
