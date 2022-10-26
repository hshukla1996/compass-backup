import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeJobChangesComponent } from './income_job_changes.component';

describe('IncomeJobChangesComponent', () => {
  let component: IncomeJobChangesComponent;
  let fixture: ComponentFixture<IncomeJobChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeJobChangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeJobChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
