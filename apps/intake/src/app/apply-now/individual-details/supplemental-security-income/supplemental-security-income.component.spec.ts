import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplementalSecurityIncomeComponent } from './supplemental-security-income.component';

describe('SupplementalSecurityIncomeComponent', () => {
  let component: SupplementalSecurityIncomeComponent;
  let fixture: ComponentFixture<SupplementalSecurityIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplementalSecurityIncomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplementalSecurityIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
