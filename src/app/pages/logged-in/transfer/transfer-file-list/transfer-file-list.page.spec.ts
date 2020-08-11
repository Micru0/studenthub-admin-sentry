import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransferFileListPage } from './transfer-file-list.page';

describe('TransferFileListPage', () => {
  let component: TransferFileListPage;
  let fixture: ComponentFixture<TransferFileListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferFileListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransferFileListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
