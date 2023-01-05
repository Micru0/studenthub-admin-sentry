import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FulltimerComponent } from './fulltimer.component';

describe('FulltimerComponent', () => {
  let component: FulltimerComponent;
  let fixture: ComponentFixture<FulltimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FulltimerComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FulltimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
