import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminListPage } from './admin-list.page';

describe('AdminListPage', () => {
  let component: AdminListPage;
  let fixture: ComponentFixture<AdminListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
