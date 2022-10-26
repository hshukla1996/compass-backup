import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeJobMoreDetailsComponent } from './income-jobmoredetails.component';

describe('IncomeJobMoreDetailsComponent', () => {
  let component: IncomeJobMoreDetailsComponent;
  let fixture: ComponentFixture<IncomeJobMoreDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncomeJobMoreDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeJobMoreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
