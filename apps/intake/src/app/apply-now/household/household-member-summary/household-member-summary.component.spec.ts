import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdMemberSummaryComponent } from './household-member-summary.component';

describe('HouseholdMemberSummaryComponent', () => {
  let component: HouseholdMemberSummaryComponent;
  let fixture: ComponentFixture<HouseholdMemberSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdMemberSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdMemberSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
