import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdCriminalHistoryComponent } from './household-criminal-history.component';

describe('HouseholdCriminalHistoryComponent', () => {
  let component: HouseholdCriminalHistoryComponent;
  let fixture: ComponentFixture<HouseholdCriminalHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdCriminalHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdCriminalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
