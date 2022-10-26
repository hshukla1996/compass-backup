import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdFacilityScreenComponent } from './household-facility-screen.component';

describe('HouseholdFacilityScreenComponent', () => {
  let component: HouseholdFacilityScreenComponent;
  let fixture: ComponentFixture<HouseholdFacilityScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdFacilityScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdFacilityScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
