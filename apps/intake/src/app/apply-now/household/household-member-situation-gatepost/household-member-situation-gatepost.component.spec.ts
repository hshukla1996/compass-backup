import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdMemberSituationGatepostComponent } from './household-member-situation-gatepost.component';

describe('HouseholdMemberSituationGatepostComponent', () => {
  let component: HouseholdMemberSituationGatepostComponent;
  let fixture: ComponentFixture<HouseholdMemberSituationGatepostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdMemberSituationGatepostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdMemberSituationGatepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
