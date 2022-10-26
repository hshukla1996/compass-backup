import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualCurrentlyFleeingComponent } from './individual-currently-fleeing.component';

describe('IndividualCurrentlyFleeingComponent', () => {
  let component: IndividualCurrentlyFleeingComponent;
  let fixture: ComponentFixture<IndividualCurrentlyFleeingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualCurrentlyFleeingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualCurrentlyFleeingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
