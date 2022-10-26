import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomePastJobSummaryComponent } from './income-pastjobsummary.component';

describe('IncomePastJobSummaryComponent', () => {
  let component: IncomePastJobSummaryComponent;
  let fixture: ComponentFixture<IncomePastJobSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncomePastJobSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomePastJobSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
