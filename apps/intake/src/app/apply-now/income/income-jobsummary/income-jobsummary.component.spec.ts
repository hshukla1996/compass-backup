import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeJobSummaryComponent } from './income-jobsummary.component';

describe('IncomeJobSummaryComponent', () => {
  let component: IncomeJobSummaryComponent;
  let fixture: ComponentFixture<IncomeJobSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncomeJobSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeJobSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
