import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurialOrTrustAgreementDetailsComponent } from './burial-or-trust-agreement-details.component';

describe('BurialOrTrustAgreementDetailsComponent', () => {
  let component: BurialOrTrustAgreementDetailsComponent;
  let fixture: ComponentFixture<BurialOrTrustAgreementDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BurialOrTrustAgreementDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BurialOrTrustAgreementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
