import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeInsurancePoliciesComponent } from './life-insurance-policies.component';

describe('LifeInsurancePoliciesComponent', () => {
  let component: LifeInsurancePoliciesComponent;
  let fixture: ComponentFixture<LifeInsurancePoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifeInsurancePoliciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeInsurancePoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
