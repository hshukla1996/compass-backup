import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdQuickSnapEndComponent } from './household-quick-snap-end.component';

describe('HouseholdQuickSnapEndComponent', () => {
  let component: HouseholdQuickSnapEndComponent;
  let fixture: ComponentFixture<HouseholdQuickSnapEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdQuickSnapEndComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdQuickSnapEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
