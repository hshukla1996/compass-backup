import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurialOrTrustAgreementSummaryComponent } from './burial-or-trust-agreement-summary.component';

describe('BurialOrTrustAgreementSummaryComponent', () => {
  let component: BurialOrTrustAgreementSummaryComponent;
  let fixture: ComponentFixture<BurialOrTrustAgreementSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BurialOrTrustAgreementSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BurialOrTrustAgreementSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
