import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesLegalFeeSummaryComponent } from './expenses-legal-fee-summary.component';

describe('ExpensesLegalFeeSummaryComponent', () => {
  let component: ExpensesLegalFeeSummaryComponent;
  let fixture: ComponentFixture<ExpensesLegalFeeSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesLegalFeeSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesLegalFeeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
