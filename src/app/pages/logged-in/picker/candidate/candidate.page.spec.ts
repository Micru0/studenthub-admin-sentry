import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CandidatePage } from './candidate.page';

describe('CandidatePage', () => {
  let component: CandidatePage;
  let fixture: ComponentFixture<CandidatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CandidatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
