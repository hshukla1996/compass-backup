import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyInsuranceDetailsComponent } from './property-insurance-details.component';

describe('PropertyInsuranceDetailsComponent', () => {
  let component: PropertyInsuranceDetailsComponent;
  let fixture: ComponentFixture<PropertyInsuranceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyInsuranceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyInsuranceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
