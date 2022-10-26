import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdBenefitsComponent } from './household-benefits.component';

describe('HouseholdBenefitsComponent', () => {
  let component: HouseholdBenefitsComponent;
  let fixture: ComponentFixture<HouseholdBenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdBenefitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
