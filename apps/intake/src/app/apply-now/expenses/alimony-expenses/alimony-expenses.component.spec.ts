import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildSupportExpensesComponent } from "./child-support-expenses.component";

describe('ExpensesLegalFeeComponent', () => {
  let component: ChildSupportExpensesComponent;
  let fixture: ComponentFixture<ChildSupportExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ChildSupportExpensesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildSupportExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
