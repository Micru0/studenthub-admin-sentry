import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StaffListPage } from './staff-list.page';

describe('StaffListPage', () => {
  let component: StaffListPage;
  let fixture: ComponentFixture<StaffListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StaffListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
