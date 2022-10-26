import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdAddressComponent } from './household-address.component';

describe('HouseholdAddressComponent', () => {
  let component: HouseholdAddressComponent;
  let fixture: ComponentFixture<HouseholdAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
