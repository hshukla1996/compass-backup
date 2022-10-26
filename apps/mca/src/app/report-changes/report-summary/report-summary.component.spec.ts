import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSummarycomponent} from './report-summary.component';

describe('ReportSummarycomponent', () => {
  let component: ReportSummarycomponent;
  let fixture: ComponentFixture<ReportSummarycomponent >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportSummarycomponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSummarycomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
