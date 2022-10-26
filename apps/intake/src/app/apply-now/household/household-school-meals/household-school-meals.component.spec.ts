import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdSchoolMealsComponent } from './household-school-meals.component';

describe('HouseholdSchoolMealsComponent', () => {
  let component: HouseholdSchoolMealsComponent;
  let fixture: ComponentFixture<HouseholdSchoolMealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdSchoolMealsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdSchoolMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
