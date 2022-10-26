import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdBenefitsCoverageComponent } from './household-benefits-coverage.component';

describe('HouseholdBenefitsCoverageComponent', () => {
  let component: HouseholdBenefitsCoverageComponent;
  let fixture: ComponentFixture<HouseholdBenefitsCoverageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdBenefitsCoverageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdBenefitsCoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
