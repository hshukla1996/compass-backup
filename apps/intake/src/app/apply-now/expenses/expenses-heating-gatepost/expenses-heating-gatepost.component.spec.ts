import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesHeatingGatepostComponent } from './expenses-heating-gatepost.component';

describe('ExpensesHeatingGatepostComponent', () => {
  let component: ExpensesHeatingGatepostComponent;
  let fixture: ComponentFixture<ExpensesHeatingGatepostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesHeatingGatepostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesHeatingGatepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
