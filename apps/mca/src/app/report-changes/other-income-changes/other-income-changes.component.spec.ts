import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherIncomeChangesComponent } from './other-income-changes.component';

describe('OtherIncomeChangesComponent', () => {
  let component: OtherIncomeChangesComponent;
  let fixture: ComponentFixture<OtherIncomeChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherIncomeChangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherIncomeChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
