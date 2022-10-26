import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesLegalFeeComponent } from './expenses-legal-fee.component';

describe('ExpensesLegalFeeComponent', () => {
  let component: ExpensesLegalFeeComponent;
  let fixture: ComponentFixture<ExpensesLegalFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesLegalFeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesLegalFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
