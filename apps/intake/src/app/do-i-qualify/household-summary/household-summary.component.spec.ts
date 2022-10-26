import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdSummaryComponent } from './household-summary.component';

describe('HouseholdSummaryComponent', () => {
  let component: HouseholdSummaryComponent;
  let fixture: ComponentFixture<HouseholdSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
