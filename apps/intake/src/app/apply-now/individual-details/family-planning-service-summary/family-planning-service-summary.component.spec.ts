import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyPlanningServiceSummaryComponent } from './family-planning-service-summary.component';

describe('FamilyPlanningServiceSummaryComponent', () => {
  let component: FamilyPlanningServiceSummaryComponent;
  let fixture: ComponentFixture<FamilyPlanningServiceSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyPlanningServiceSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyPlanningServiceSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
