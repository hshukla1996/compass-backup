import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdChildCareCostComponent } from './household-child-care-cost.component';

describe('HouseholdChildCareCostComponent', () => {
  let component: HouseholdChildCareCostComponent;
  let fixture: ComponentFixture<HouseholdChildCareCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdChildCareCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdChildCareCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
