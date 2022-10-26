import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentialPropertySummaryComponent } from './residential-property-summary.component';

describe('ResidentialPropertySummaryComponent', () => {
  let component: ResidentialPropertySummaryComponent;
  let fixture: ComponentFixture<ResidentialPropertySummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidentialPropertySummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentialPropertySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
