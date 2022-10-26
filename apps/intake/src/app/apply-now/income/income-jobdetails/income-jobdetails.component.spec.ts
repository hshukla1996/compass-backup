import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeJobDetailsComponent } from './income-jobdetails.component';

describe('IncomeJobDetailsComponent', () => {
  let component: IncomeJobDetailsComponent;
  let fixture: ComponentFixture<IncomeJobDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeJobDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeJobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
