import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportChangesGatepostComponent } from './report-changes-gatepost.component';

describe('ReportChangesGatepostComponent', () => {
  let component: ReportChangesGatepostComponent;
  let fixture: ComponentFixture<ReportChangesGatepostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportChangesGatepostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportChangesGatepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
