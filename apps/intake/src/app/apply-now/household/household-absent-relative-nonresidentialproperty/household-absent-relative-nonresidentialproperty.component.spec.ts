import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdAbsentRelativeNonresidentialpropertyComponent } from './household-absent-relative-nonresidentialproperty.component';

describe('HouseholdAbsentRelativeNonresidentialpropertyComponent', () => {
  let component: HouseholdAbsentRelativeNonresidentialpropertyComponent;
  let fixture: ComponentFixture<HouseholdAbsentRelativeNonresidentialpropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdAbsentRelativeNonresidentialpropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdAbsentRelativeNonresidentialpropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
