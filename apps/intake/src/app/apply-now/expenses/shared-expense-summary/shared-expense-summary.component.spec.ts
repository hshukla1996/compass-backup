import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedExpenseSummaryComponent } from './shared-expense-summary.component';

describe('SharedExpenseSummaryComponent', () => {
  let component: SharedExpenseSummaryComponent;
  let fixture: ComponentFixture<SharedExpenseSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedExpenseSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedExpenseSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
