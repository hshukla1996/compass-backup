import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdCashAssistanceComponent } from './household-cash-assistance.component';

describe('HouseholdCashAssistanceComponent', () => {
  let component: HouseholdCashAssistanceComponent;
  let fixture: ComponentFixture<HouseholdCashAssistanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdCashAssistanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdCashAssistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
