import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesSummaryComponent } from './expenses-summary.component';

describe('ExpensesSummaryComponent', () => {
  let component: ExpensesSummaryComponent;
  let fixture: ComponentFixture<ExpensesSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
