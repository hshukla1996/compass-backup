import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesHouseholdMortgageRentComponent } from './expenses-household-mortgage-rent.component';

describe('ExpensesHouseholdMortgageRentComponent', () => {
  let component: ExpensesHouseholdMortgageRentComponent;
  let fixture: ComponentFixture<ExpensesHouseholdMortgageRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesHouseholdMortgageRentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesHouseholdMortgageRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
