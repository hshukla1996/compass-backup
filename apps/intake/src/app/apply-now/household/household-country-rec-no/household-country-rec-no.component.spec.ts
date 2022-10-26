import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdCountryRecNoComponent } from './household-country-rec-no.component';

describe('HouseholdCountryRecNoComponent', () => {
  let component: HouseholdCountryRecNoComponent;
  let fixture: ComponentFixture<HouseholdCountryRecNoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdCountryRecNoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdCountryRecNoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
