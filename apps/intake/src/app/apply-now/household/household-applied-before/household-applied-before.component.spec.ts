import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdAppliedBeforeComponent } from './household-applied-before.component';

describe('HouseholdAppliedBeforeComponent', () => {
  let component: HouseholdAppliedBeforeComponent;
  let fixture: ComponentFixture<HouseholdAppliedBeforeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdAppliedBeforeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdAppliedBeforeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
