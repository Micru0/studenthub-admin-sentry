import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssignedCandidatePage } from './assigned-candidate.page';

describe('AssignedCandidatePage', () => {
  let component: AssignedCandidatePage;
  let fixture: ComponentFixture<AssignedCandidatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedCandidatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssignedCandidatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
