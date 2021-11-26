import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RequestChecklistListPage } from './request-checklist-list.page';

describe('RequestChecklistListPage', () => {
  let component: RequestChecklistListPage;
  let fixture: ComponentFixture<RequestChecklistListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestChecklistListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RequestChecklistListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
