import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitsNotReceviedSummaryComponent } from './benefits-not-received-summary.component';

describe('BenefitsNotReceviedComponent', () => {
  let component: BenefitsNotReceviedSummaryComponent;
  let fixture: ComponentFixture<BenefitsNotReceviedSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenefitsNotReceviedSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitsNotReceviedSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
