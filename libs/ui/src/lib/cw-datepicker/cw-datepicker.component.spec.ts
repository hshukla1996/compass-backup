import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CwDatepickerComponent } from './cw-datepicker.component';

describe('CwDatepickerComponent', () => {
  let component: CwDatepickerComponent;
  let fixture: ComponentFixture<CwDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CwDatepickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CwDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
