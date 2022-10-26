import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdIncarcerationComponent } from './household-incarceration.component';

describe('HouseholdIncarcerationComponent', () => {
  let component: HouseholdIncarcerationComponent;
  let fixture: ComponentFixture<HouseholdIncarcerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdIncarcerationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdIncarcerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
