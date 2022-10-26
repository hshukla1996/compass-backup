import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeInsurancePoliciesSummaryComponent } from './life-insurance-policies-summary.component';

describe('LifeInsurancePoliciesSummaryComponent', () => {
  let component: LifeInsurancePoliciesSummaryComponent;
  let fixture: ComponentFixture<LifeInsurancePoliciesSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifeInsurancePoliciesSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeInsurancePoliciesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
