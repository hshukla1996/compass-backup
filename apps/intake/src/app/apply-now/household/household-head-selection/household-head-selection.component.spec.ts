import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdHeadSelectionComponent } from './household-head-selection.component';

describe('HouseholdHeadSelectionComponent', () => {
  let component: HouseholdHeadSelectionComponent;
  let fixture: ComponentFixture<HouseholdHeadSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdHeadSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdHeadSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
