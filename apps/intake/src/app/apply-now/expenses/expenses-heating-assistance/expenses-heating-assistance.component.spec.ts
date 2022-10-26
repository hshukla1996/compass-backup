import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesHeatingAssistanceComponent } from './expenses-heating-assistance.component';

describe('ExpensesHeatingAssistanceComponent', () => {
  let component: ExpensesHeatingAssistanceComponent;
  let fixture: ComponentFixture<ExpensesHeatingAssistanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesHeatingAssistanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesHeatingAssistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
