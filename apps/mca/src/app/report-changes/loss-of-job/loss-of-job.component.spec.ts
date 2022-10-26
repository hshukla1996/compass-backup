import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LossOfJobComponent } from './loss-of-job.component';

describe('LossOfJobComponent', () => {
  let component: LossOfJobComponent;
  let fixture: ComponentFixture<LossOfJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LossOfJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LossOfJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
