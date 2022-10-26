import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherIncomeSummaryComponent } from './other-income-summary.component';

describe('OtherIncomeSummaryComponent', () => {
  let component: OtherIncomeSummaryComponent;
  let fixture: ComponentFixture<OtherIncomeSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherIncomeSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherIncomeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
