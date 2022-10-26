import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeInsurancePolicyDetailsComponent } from './life-insurance-policy-details.component';

describe('LifeInsurancePolicyDetailsComponent', () => {
  let component: LifeInsurancePolicyDetailsComponent;
  let fixture: ComponentFixture<LifeInsurancePolicyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifeInsurancePolicyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeInsurancePolicyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
