import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidUnpaidMedicalBillsComponent } from './paid-unpaid-medical-bills.component';

describe('PaidUnpaidMedicalBillsComponent', () => {
  let component: PaidUnpaidMedicalBillsComponent;
  let fixture: ComponentFixture<PaidUnpaidMedicalBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaidUnpaidMedicalBillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidUnpaidMedicalBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
