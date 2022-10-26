import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregnancyOtherHouseholdComponent } from './pregnancy_other_household_changes.component';

describe('IncomeJobChangesComponent', () => {
  let component: PregnancyOtherHouseholdComponent;
  let fixture: ComponentFixture<PregnancyOtherHouseholdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PregnancyOtherHouseholdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregnancyOtherHouseholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
