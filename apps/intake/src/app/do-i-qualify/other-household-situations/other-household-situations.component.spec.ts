import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherHouseholdSituationsComponent } from './other-household-situations.component';

describe('OtherHouseholdSituationsComponent', () => {
  let component: OtherHouseholdSituationsComponent;
  let fixture: ComponentFixture<OtherHouseholdSituationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherHouseholdSituationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherHouseholdSituationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
