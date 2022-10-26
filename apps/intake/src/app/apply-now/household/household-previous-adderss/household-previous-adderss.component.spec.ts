import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdPreviousAdderssComponent } from './household-previous-adderss.component';

describe('HouseholdPreviousAdderssComponent', () => {
  let component: HouseholdPreviousAdderssComponent;
  let fixture: ComponentFixture<HouseholdPreviousAdderssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdPreviousAdderssComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdPreviousAdderssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
