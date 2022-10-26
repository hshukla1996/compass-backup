import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesEndingComponent } from './expenses-ending.component';

describe('ExpensesEndingComponent', () => {
  let component: ExpensesEndingComponent;
  let fixture: ComponentFixture<ExpensesEndingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesEndingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesEndingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
