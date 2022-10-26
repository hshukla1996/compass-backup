import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdAnotherPersonComponent } from './household-another-person.component';

describe('HouseholdAnotherPersonComponent', () => {
  let component: HouseholdAnotherPersonComponent;
  let fixture: ComponentFixture<HouseholdAnotherPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdAnotherPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdAnotherPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
