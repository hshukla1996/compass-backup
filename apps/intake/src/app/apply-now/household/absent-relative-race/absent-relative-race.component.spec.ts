import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsentRelativeRaceComponent } from './absent-relative-race.component';

describe('AbsentRelativeRaceComponent', () => {
  let component: AbsentRelativeRaceComponent;
  let fixture: ComponentFixture<AbsentRelativeRaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsentRelativeRaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsentRelativeRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
