import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RequestChecklistViewPage } from './request-checklist-view.page';

describe('RequestChecklistViewPage', () => {
  let component: RequestChecklistViewPage;
  let fixture: ComponentFixture<RequestChecklistViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestChecklistViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RequestChecklistViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
