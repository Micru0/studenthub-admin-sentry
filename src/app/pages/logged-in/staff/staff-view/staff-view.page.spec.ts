import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StaffViewPage } from './staff-view.page';

describe('StaffViewPage', () => {
  let component: StaffViewPage;
  let fixture: ComponentFixture<StaffViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StaffViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
