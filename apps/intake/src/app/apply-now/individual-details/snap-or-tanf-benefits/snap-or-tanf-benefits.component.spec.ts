import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapOrTanfBenefitsComponent } from './snap-or-tanf-benefits.component';

describe('BenefitsNotReceviedComponent', () => {
  let component: SnapOrTanfBenefitsComponent;
  let fixture: ComponentFixture<SnapOrTanfBenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnapOrTanfBenefitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnapOrTanfBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
