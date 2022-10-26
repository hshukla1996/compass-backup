import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyIncomePrevComponent } from './monthly-income-prev.component';

describe('MonthlyIncomePrevComponent', () => {
  let component: MonthlyIncomePrevComponent;
  let fixture: ComponentFixture<MonthlyIncomePrevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyIncomePrevComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyIncomePrevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
