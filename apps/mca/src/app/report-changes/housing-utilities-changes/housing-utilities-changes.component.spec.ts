import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingUtilitiesChangesComponent } from './housing-utilities-changes.component';

describe('HousingUtilitiesChangesComponent', () => {
  let component: HousingUtilitiesChangesComponent;
  let fixture: ComponentFixture<HousingUtilitiesChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HousingUtilitiesChangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HousingUtilitiesChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
