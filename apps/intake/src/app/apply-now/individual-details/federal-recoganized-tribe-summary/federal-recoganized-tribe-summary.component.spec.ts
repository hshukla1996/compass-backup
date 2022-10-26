import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FederalRecoganizedTribeSummaryComponent } from './federal-recoganized-tribe-summary.component';

describe('FederalRecoganizedTribeSummaryComponent', () => {
  let component: FederalRecoganizedTribeSummaryComponent;
  let fixture: ComponentFixture<FederalRecoganizedTribeSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FederalRecoganizedTribeSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FederalRecoganizedTribeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
