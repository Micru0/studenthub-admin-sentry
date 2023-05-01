import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardQuicksPage } from './dashboard-quicks.page';

describe('DashboardQuicksPage', () => {
  let component: DashboardQuicksPage;
  let fixture: ComponentFixture<DashboardQuicksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardQuicksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardQuicksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
