import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplementalSecurityIncomeDetailsComponent } from './supplemental-security-income-details.component';

describe('SupplementalSecurityIncomeDetailsComponent', () => {
  let component: SupplementalSecurityIncomeDetailsComponent;
  let fixture: ComponentFixture<SupplementalSecurityIncomeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplementalSecurityIncomeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplementalSecurityIncomeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
