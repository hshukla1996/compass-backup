import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckEBTComponent } from './check-ebt.component';

describe('CheckEBTComponent', () => {
  let component: CheckEBTComponent;
  let fixture: ComponentFixture<CheckEBTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckEBTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckEBTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
