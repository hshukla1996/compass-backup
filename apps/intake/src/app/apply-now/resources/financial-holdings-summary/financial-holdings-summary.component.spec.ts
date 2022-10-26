import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialHoldingsSummaryComponent } from './financial-holdings-summary.component';

describe('FinancialHoldingsSummaryComponent', () => {
  let component: FinancialHoldingsSummaryComponent;
  let fixture: ComponentFixture<FinancialHoldingsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialHoldingsSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialHoldingsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
