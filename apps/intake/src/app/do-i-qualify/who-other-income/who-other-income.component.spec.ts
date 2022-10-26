import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoOtherIncomeComponent } from './who-other-income.component';

describe('WhoOtherIncomeComponent', () => {
  let component: WhoOtherIncomeComponent;
  let fixture: ComponentFixture<WhoOtherIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhoOtherIncomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhoOtherIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
