import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonResidentialPropertySummaryComponent } from './non-residential-property-summary.component';

describe('NonResidentialPropertySummaryComponent', () => {
  let component: NonResidentialPropertySummaryComponent;
  let fixture: ComponentFixture<NonResidentialPropertySummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonResidentialPropertySummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonResidentialPropertySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
