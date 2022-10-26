import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdFoodStampsComponent } from './household-food-stamps.component';

describe('HouseholdFoodStampsComponent', () => {
  let component: HouseholdFoodStampsComponent;
  let fixture: ComponentFixture<HouseholdFoodStampsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdFoodStampsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdFoodStampsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
