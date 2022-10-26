import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherIncomeDetailsComponent } from './other-income-details.component';

describe('OtherIncomeDetailsComponent', () => {
  let component: OtherIncomeDetailsComponent;
  let fixture: ComponentFixture<OtherIncomeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherIncomeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherIncomeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
