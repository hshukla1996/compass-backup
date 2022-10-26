import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyPlanningServiceReviewComponent } from './family-planning-service-review.component';

describe('FamilyPlanningServiceReviewComponent', () => {
  let component: FamilyPlanningServiceReviewComponent;
  let fixture: ComponentFixture<FamilyPlanningServiceReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyPlanningServiceReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyPlanningServiceReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
