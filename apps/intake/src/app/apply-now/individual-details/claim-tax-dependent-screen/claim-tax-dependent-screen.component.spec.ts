import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimTaxDependentScreenComponent } from './claim-tax-dependent-screen.component';

describe('BenefitsNotReceviedComponent', () => {
  let component: ClaimTaxDependentScreenComponent;
  let fixture: ComponentFixture<ClaimTaxDependentScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClaimTaxDependentScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimTaxDependentScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
