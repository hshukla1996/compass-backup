import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialHoldingsComponent } from './financial-holdings.component';

describe('FinancialHoldingsComponent', () => {
  let component: FinancialHoldingsComponent;
  let fixture: ComponentFixture<FinancialHoldingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialHoldingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialHoldingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
