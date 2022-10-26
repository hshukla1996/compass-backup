import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonMedicalAssisComponent } from './non-medical-assis.component';

describe('NonMedicalAssisComponent', () => {
  let component: NonMedicalAssisComponent;
  let fixture: ComponentFixture<NonMedicalAssisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonMedicalAssisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonMedicalAssisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
