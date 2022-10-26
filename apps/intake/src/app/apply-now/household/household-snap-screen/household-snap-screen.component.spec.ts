import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdSnapScreenComponent } from './household-snap-screen.component';

describe('HouseholdSnapScreenComponent', () => {
  let component: HouseholdSnapScreenComponent;
  let fixture: ComponentFixture<HouseholdSnapScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdSnapScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdSnapScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
