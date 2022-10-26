import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualCurrentlyOnProbationComponent } from './individual-currently-on-probation.component';

describe('IndividualCurrentlyOnProbationComponent', () => {
  let component: IndividualCurrentlyOnProbationComponent;
  let fixture: ComponentFixture<IndividualCurrentlyOnProbationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualCurrentlyOnProbationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualCurrentlyOnProbationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
