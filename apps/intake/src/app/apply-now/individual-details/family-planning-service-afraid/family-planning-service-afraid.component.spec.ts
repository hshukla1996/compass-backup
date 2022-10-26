import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyPlanningServiceAfraidComponent } from './family-planning-service-afraid.component';

describe('FamilyPlanningServiceAfraidComponent', () => {
  let component: FamilyPlanningServiceAfraidComponent;
  let fixture: ComponentFixture<FamilyPlanningServiceAfraidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyPlanningServiceAfraidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyPlanningServiceAfraidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
