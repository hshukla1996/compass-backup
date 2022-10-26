import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplementalSecurityIncomeSummaryComponent } from './supplemental-security-income-summary.component';

describe('SupplementalSecurityIncomeSummaryComponent', () => {
  let component: SupplementalSecurityIncomeSummaryComponent;
  let fixture: ComponentFixture<SupplementalSecurityIncomeSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplementalSecurityIncomeSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplementalSecurityIncomeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
