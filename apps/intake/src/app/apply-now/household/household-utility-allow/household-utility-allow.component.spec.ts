import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdUtilityAllowComponent } from './household-utility-allow.component';

describe('HouseholdUtilityAllowComponent', () => {
  let component: HouseholdUtilityAllowComponent;
  let fixture: ComponentFixture<HouseholdUtilityAllowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdUtilityAllowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdUtilityAllowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
