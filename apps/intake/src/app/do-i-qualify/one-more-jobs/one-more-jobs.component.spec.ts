import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneMoreJobsComponent } from './one-more-jobs.component';

describe('OneMoreJobsComponent', () => {
  let component: OneMoreJobsComponent;
  let fixture: ComponentFixture<OneMoreJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneMoreJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneMoreJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
