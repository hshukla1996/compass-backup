import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurialOrTrustAgreementAdditionalDetailsComponent } from './burial-or-trust-agreement-additional-details.component';

describe('BurialOrTrustAgreementAdditionalDetailsComponent', () => {
  let component: BurialOrTrustAgreementAdditionalDetailsComponent;
  let fixture: ComponentFixture<BurialOrTrustAgreementAdditionalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BurialOrTrustAgreementAdditionalDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BurialOrTrustAgreementAdditionalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
