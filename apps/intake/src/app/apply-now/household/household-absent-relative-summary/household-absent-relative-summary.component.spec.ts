import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdAbsentRelativeSummaryComponent } from './household-absent-relative-summary.component';

describe('HouseholdAbsentRelativeSummaryComponent', () => {
  let component: HouseholdAbsentRelativeSummaryComponent;
  let fixture: ComponentFixture<HouseholdAbsentRelativeSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdAbsentRelativeSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdAbsentRelativeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
