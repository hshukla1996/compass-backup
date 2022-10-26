import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesHouseholdPropertyInsuranceComponent } from './expenses-household-property-insurance.component';

describe('ExpensesHouseholdPropertyInsuranceComponent', () => {
  let component: ExpensesHouseholdPropertyInsuranceComponent;
  let fixture: ComponentFixture<ExpensesHouseholdPropertyInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesHouseholdPropertyInsuranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesHouseholdPropertyInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
