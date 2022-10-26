import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdFraudComponent } from './household-fraud.component';

describe('HouseholdFraudComponent', () => {
  let component: HouseholdFraudComponent;
  let fixture: ComponentFixture<HouseholdFraudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdFraudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdFraudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
