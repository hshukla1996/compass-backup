import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdLivingSistuationComponent } from './household-living-sistuation.component';

describe('HouseholdLivingSistuationComponent', () => {
  let component: HouseholdLivingSistuationComponent;
  let fixture: ComponentFixture<HouseholdLivingSistuationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdLivingSistuationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdLivingSistuationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
