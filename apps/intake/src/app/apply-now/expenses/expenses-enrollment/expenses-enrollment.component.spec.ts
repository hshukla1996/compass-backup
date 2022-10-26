import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesLandingComponent } from "./expenses-enrollment.component";

describe('ExpensesEnrollmentComponent', () => {
  let component: ExpensesLandingComponent;
  let fixture: ComponentFixture<ExpensesLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ExpensesLandingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
