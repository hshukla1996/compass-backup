import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesUtilityGatepostComponent } from './expenses-utility-gatepost.component';

describe('ExpensesUtilityGatepostComponent', () => {
  let component: ExpensesUtilityGatepostComponent;
  let fixture: ComponentFixture<ExpensesUtilityGatepostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesUtilityGatepostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesUtilityGatepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
