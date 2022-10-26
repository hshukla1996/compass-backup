import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NursingFacilityDetailsComponent } from './nursing-facility-details.component';

describe('NursingFacilityDetailsComponent', () => {
  let component: NursingFacilityDetailsComponent;
  let fixture: ComponentFixture<NursingFacilityDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NursingFacilityDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NursingFacilityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
