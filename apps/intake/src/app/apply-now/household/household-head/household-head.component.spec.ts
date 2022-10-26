import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdHeadComponent } from './household-head.component';

describe('HouseholdHeadComponent', () => {
  let component: HouseholdHeadComponent;
  let fixture: ComponentFixture<HouseholdHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdHeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
