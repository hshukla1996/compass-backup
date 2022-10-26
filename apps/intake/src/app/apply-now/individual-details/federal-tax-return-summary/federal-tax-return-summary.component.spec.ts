import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FederalIncomeTaxReturnComponent } from './federal-tax-return-summary.component';

describe('BenefitsNotReceviedComponent', () => {
  let component: FederalIncomeTaxReturnComponent;
  let fixture: ComponentFixture<FederalIncomeTaxReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FederalIncomeTaxReturnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FederalIncomeTaxReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
