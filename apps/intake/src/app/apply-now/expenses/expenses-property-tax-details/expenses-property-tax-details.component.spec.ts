import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesPropertyTaxDetailsComponent } from './expenses-property-tax-details.component';

describe('ExpensesPropertyTaxDetailsComponent', () => {
  let component: ExpensesPropertyTaxDetailsComponent;
  let fixture: ComponentFixture<ExpensesPropertyTaxDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesPropertyTaxDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesPropertyTaxDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
