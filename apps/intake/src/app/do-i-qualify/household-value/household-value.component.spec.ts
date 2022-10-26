import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdValueComponent } from './household-value.component';

describe('HouseholdValueComponent', () => {
  let component: HouseholdValueComponent;
  let fixture: ComponentFixture<HouseholdValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
