import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdWhoApplyLtcComponent } from './household-who-apply-ltc.component';

describe('HouseholdWhoApplyLtcComponent', () => {
  let component: HouseholdWhoApplyLtcComponent;
  let fixture: ComponentFixture<HouseholdWhoApplyLtcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdWhoApplyLtcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdWhoApplyLtcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
