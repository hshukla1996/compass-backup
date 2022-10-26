import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurialOrTrustAgreementComponent } from './burial-or-trust-agreement.component';

describe('BurialOrTrustAgreementComponent', () => {
  let component: BurialOrTrustAgreementComponent;
  let fixture: ComponentFixture<BurialOrTrustAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BurialOrTrustAgreementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BurialOrTrustAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
