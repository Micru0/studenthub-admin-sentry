import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TagViewPage } from './tag-view.page';

describe('TagViewPage', () => {
  let component: TagViewPage;
  let fixture: ComponentFixture<TagViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TagViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
