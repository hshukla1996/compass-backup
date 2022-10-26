import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewJobChangesComponent } from './new-job-changes.component';

describe('NewJobChangesComponent', () => {
  let component: NewJobChangesComponent;
  let fixture: ComponentFixture<NewJobChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewJobChangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewJobChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
