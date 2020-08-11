import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransferFileDetailPage } from './transfer-file-detail.page';

describe('TransferFileDetailPage', () => {
  let component: TransferFileDetailPage;
  let fixture: ComponentFixture<TransferFileDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferFileDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransferFileDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
