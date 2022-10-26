import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyPlanningServicesComponent } from './family-planning-services.component';

describe('BenefitsNotReceviedComponent', () => {
  let component: FamilyPlanningServicesComponent;
  let fixture: ComponentFixture<FamilyPlanningServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyPlanningServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyPlanningServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
