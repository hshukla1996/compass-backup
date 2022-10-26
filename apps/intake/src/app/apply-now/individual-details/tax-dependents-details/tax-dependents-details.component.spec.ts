import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxDependentsDetailsComponent } from './tax-dependents-details.component';

describe('BenefitsNotReceviedComponent', () => {
  let component: TaxDependentsDetailsComponent;
  let fixture: ComponentFixture<TaxDependentsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxDependentsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxDependentsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
