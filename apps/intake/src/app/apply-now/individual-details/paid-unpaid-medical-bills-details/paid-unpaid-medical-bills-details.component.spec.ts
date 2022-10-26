import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidUnpaidBillsDetailsComponent } from './paid-unpaid-medical-bills-details.component';

describe('PaidUnpaidBillsDetailsComponent', () => {
  let component: PaidUnpaidBillsDetailsComponent;
  let fixture: ComponentFixture<PaidUnpaidBillsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaidUnpaidBillsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidUnpaidBillsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
