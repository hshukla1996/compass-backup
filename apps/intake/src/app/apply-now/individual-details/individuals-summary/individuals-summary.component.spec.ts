import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualsSummaryComponent } from './individuals-summary.component';

describe('BenefitsNotReceviedComponent', () => {
  let component: IndividualsSummaryComponent;
  let fixture: ComponentFixture<IndividualsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualsSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
