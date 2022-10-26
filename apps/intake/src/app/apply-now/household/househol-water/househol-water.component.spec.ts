import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholWaterComponent } from './househol-water.component';

describe('HouseholWaterComponent', () => {
  let component: HouseholWaterComponent;
  let fixture: ComponentFixture<HouseholWaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholWaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholWaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
