import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapOrTanfBenefitsDetailsComponent } from './snap-or-tanf-benefits-details.component';

describe('BenefitsNotReceviedComponent', () => {
  let component: SnapOrTanfBenefitsDetailsComponent;
  let fixture: ComponentFixture<SnapOrTanfBenefitsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnapOrTanfBenefitsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnapOrTanfBenefitsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
