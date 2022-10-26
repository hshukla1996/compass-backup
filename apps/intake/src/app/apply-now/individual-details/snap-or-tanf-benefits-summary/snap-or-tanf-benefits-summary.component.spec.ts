import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapOrTanfBenefitsSummaryComponent } from './snap-or-tanf-benefits-summary.component';

describe('BenefitsNotReceviedComponent', () => {
  let component: SnapOrTanfBenefitsSummaryComponent;
  let fixture: ComponentFixture<SnapOrTanfBenefitsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnapOrTanfBenefitsSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnapOrTanfBenefitsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
