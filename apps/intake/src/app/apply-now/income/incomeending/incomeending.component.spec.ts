import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeendingComponent } from './incomeending.component';

describe('IncomeendingComponent', () => {
  let component: IncomeendingComponent;
  let fixture: ComponentFixture<IncomeendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
