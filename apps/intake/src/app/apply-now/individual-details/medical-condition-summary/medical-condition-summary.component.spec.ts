import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalConditionSummaryComponent } from './medical-condition-summary.component';

describe('MedicalConditionSummaryComponent', () => {
  let component: MedicalConditionSummaryComponent;
  let fixture: ComponentFixture<MedicalConditionSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicalConditionSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalConditionSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
