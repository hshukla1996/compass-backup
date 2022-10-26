import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthSustainingMedicationComponent } from './health-sustaining-mediciation.component';

describe('HealthSustainingMedicationComponent', () => {
  let component: HealthSustainingMedicationComponent;
  let fixture: ComponentFixture<HealthSustainingMedicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HealthSustainingMedicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthSustainingMedicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
