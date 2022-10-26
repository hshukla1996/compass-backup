import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxDependentsSummaryComponent } from './tax-dependents-summary.component';

describe('BenefitsNotReceviedComponent', () => {
  let component: TaxDependentsSummaryComponent;
  let fixture: ComponentFixture<TaxDependentsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxDependentsSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxDependentsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
