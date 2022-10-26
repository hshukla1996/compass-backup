import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemographicSummaryComponent } from './demographic-summary.component';

describe('HouseholdMemberSummaryComponent', () => {
  let component: DemographicSummaryComponent;
  let fixture: ComponentFixture<DemographicSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemographicSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemographicSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
