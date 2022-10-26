import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdReviewAddressComponent } from './household-review-address.component';

describe('HouseholdReviewAddressComponent', () => {
  let component: HouseholdReviewAddressComponent;
  let fixture: ComponentFixture<HouseholdReviewAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdReviewAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdReviewAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
