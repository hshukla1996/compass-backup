import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedExpensesComponent } from './shared-expenses.component';

describe('SharedExpensesComponent', () => {
  let component: SharedExpensesComponent;
  let fixture: ComponentFixture<SharedExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedExpensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
