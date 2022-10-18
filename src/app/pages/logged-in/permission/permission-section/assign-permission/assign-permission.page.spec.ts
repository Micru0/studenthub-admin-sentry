import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssignPermissionPage } from './university-list.page';

describe('AssignPermissionPage', () => {
  let component: AssignPermissionPage;
  let fixture: ComponentFixture<AssignPermissionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignPermissionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssignPermissionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
