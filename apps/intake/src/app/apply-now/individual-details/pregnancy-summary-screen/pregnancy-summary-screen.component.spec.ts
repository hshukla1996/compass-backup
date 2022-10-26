import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregnancySummaryScreenComponent } from './pregnancy-summary-screen.component';

describe('PregnancySummaryScreenComponent', () => {
  let component: PregnancySummaryScreenComponent;
  let fixture: ComponentFixture<PregnancySummaryScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PregnancySummaryScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregnancySummaryScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
