import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdGatepostComponent } from './household-gatepost.component';

describe('HouseholdGatepostComponent', () => {
  let component: HouseholdGatepostComponent;
  let fixture: ComponentFixture<HouseholdGatepostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdGatepostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdGatepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
