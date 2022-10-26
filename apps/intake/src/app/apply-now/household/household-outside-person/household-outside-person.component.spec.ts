import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdOutsidePersonComponent } from './household-outside-person.component';

describe('HouseholdOutsidePersonComponent', () => {
  let component: HouseholdOutsidePersonComponent;
  let fixture: ComponentFixture<HouseholdOutsidePersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdOutsidePersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdOutsidePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
