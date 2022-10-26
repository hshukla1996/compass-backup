import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdSituationComponent } from './household-situation.component';

describe('HouseholdSituationComponent', () => {
  let component: HouseholdSituationComponent;
  let fixture: ComponentFixture<HouseholdSituationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdSituationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
