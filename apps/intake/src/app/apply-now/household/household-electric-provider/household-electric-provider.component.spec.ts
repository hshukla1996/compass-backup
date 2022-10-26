import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdElectricProviderComponent } from './household-electric-provider.component';

describe('HouseholdElectricProviderComponent', () => {
  let component: HouseholdElectricProviderComponent;
  let fixture: ComponentFixture<HouseholdElectricProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdElectricProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdElectricProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
