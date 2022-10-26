import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CwButtonComponent } from './cw-button.component';

describe('CwButtonComponent', () => {
  let component: CwButtonComponent;
  let fixture: ComponentFixture<CwButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CwButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CwButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
