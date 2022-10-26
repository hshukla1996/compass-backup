import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdAbsentRelativeChildsupportComponent } from './household-absent-relative-childsupport.component';

describe('HouseholdAbsentRelativeChildsupportComponent', () => {
  let component: HouseholdAbsentRelativeChildsupportComponent;
  let fixture: ComponentFixture<HouseholdAbsentRelativeChildsupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdAbsentRelativeChildsupportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdAbsentRelativeChildsupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
