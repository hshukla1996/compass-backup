import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdLtcNursingComponent } from './household-ltc-nursing.component';

describe('HouseholdLtcNursingComponent', () => {
  let component: HouseholdLtcNursingComponent;
  let fixture: ComponentFixture<HouseholdLtcNursingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdLtcNursingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdLtcNursingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
