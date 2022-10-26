import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpectedMoneyStructureSummaryComponent } from './expected-money-structure-summary.component';

describe('ExpectedMoneyStructureSummaryComponent', () => {
  let component: ExpectedMoneyStructureSummaryComponent;
  let fixture: ComponentFixture<ExpectedMoneyStructureSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpectedMoneyStructureSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpectedMoneyStructureSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
