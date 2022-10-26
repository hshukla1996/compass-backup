import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdFineComponent } from './household-fine.component';

describe('HouseholdFineComponent', () => {
  let component: HouseholdFineComponent;
  let fixture: ComponentFixture<HouseholdFineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdFineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdFineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
