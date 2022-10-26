import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilingJointlyComponent } from './filing-jointly-screen.component';

describe('BenefitsNotReceviedComponent', () => {
  let component: FilingJointlyComponent;
  let fixture: ComponentFixture<FilingJointlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilingJointlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilingJointlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
