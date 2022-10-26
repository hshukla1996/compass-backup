import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  IncomePastJob } from './income-pastjob.component';

describe(' IncomePastJob', () => {
  let component:  IncomePastJob;
  let fixture: ComponentFixture< IncomePastJob>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [  IncomePastJob ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent( IncomePastJob);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
