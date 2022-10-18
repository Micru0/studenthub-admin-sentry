import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PermissionSectionListPage } from './university-list.page';

describe('PermissionSectionListPage', () => {
  let component: PermissionSectionListPage;
  let fixture: ComponentFixture<PermissionSectionListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionSectionListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PermissionSectionListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
