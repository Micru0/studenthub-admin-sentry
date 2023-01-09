import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StaffWorkSessionListPage } from './staff-work-session-list.page';

describe('StaffWorkSessionListPage', () => {
  let component: StaffWorkSessionListPage;
  let fixture: ComponentFixture<StaffWorkSessionListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffWorkSessionListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StaffWorkSessionListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
