import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FederalRecoganizedTribeIncomeComponent } from './federal-recoganized-tribe-income.component';

describe('FederalRecoganizedTribeIncomeComponent', () => {
  let component: FederalRecoganizedTribeIncomeComponent;
  let fixture: ComponentFixture<FederalRecoganizedTribeIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FederalRecoganizedTribeIncomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FederalRecoganizedTribeIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
