import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CwDpqButtonComponent } from './cw-dpq-button.component';

describe('CwDpqButtonComponent', () => {
  let component: CwDpqButtonComponent;
  let fixture: ComponentFixture<CwDpqButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CwDpqButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CwDpqButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
