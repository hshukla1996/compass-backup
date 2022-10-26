import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdLongtermlivingServicesComponent } from './household-longtermliving-services.component';

describe('HouseholdLongtermlivingServicesComponent', () => {
  let component: HouseholdLongtermlivingServicesComponent;
  let fixture: ComponentFixture<HouseholdLongtermlivingServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdLongtermlivingServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdLongtermlivingServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
