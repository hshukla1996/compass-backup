import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdSnapDisabilityComponent } from './household-snap-disability.component';

describe('HouseholdSnapDisabilityComponent', () => {
  let component: HouseholdSnapDisabilityComponent;
  let fixture: ComponentFixture<HouseholdSnapDisabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdSnapDisabilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdSnapDisabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
