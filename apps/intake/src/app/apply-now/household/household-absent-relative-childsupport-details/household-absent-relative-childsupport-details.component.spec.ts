import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdAbsentRelativeChildsupportDetailsComponent } from './household-absent-relative-childsupport-details.component';

describe('HouseholdAbsentRelativeChildsupportDetailsComponent', () => {
  let component: HouseholdAbsentRelativeChildsupportDetailsComponent;
  let fixture: ComponentFixture<HouseholdAbsentRelativeChildsupportDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdAbsentRelativeChildsupportDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdAbsentRelativeChildsupportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
