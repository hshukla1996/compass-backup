import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyIncomeNextComponent } from './monthly-income-next.component';

describe('MonthlyIncomeNextComponent', () => {
  let component: MonthlyIncomeNextComponent;
  let fixture: ComponentFixture<MonthlyIncomeNextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyIncomeNextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyIncomeNextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
