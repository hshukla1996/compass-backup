import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CwCheckboxComponent } from './cw-checkbox.component';

describe('CwCheckboxComponent', () => {
  let component: CwCheckboxComponent;
  let fixture: ComponentFixture<CwCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CwCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CwCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
