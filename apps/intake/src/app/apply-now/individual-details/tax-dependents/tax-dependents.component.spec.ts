import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxDependentsComponent } from './tax-dependents.component';

describe('BenefitsNotReceviedComponent', () => {
  let component: TaxDependentsComponent;
  let fixture: ComponentFixture<TaxDependentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxDependentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxDependentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
