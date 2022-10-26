import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdLivedComponent } from './household-lived.component';

describe('HouseholdLivedComponent', () => {
  let component: HouseholdLivedComponent;
  let fixture: ComponentFixture<HouseholdLivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdLivedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdLivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
