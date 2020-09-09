import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InspectorListPage } from './inspector-list.page';

describe('InspectorListPage', () => {
  let component: InspectorListPage;
  let fixture: ComponentFixture<InspectorListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectorListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InspectorListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
