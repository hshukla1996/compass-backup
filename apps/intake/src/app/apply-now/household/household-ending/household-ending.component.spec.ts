import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdEndingComponent } from './household-ending.component';

describe('HouseholdEndingComponent', () => {
  let component: HouseholdEndingComponent;
  let fixture: ComponentFixture<HouseholdEndingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdEndingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdEndingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
