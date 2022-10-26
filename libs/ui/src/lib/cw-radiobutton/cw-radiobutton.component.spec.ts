import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CwRadiobuttonComponent } from './cw-radiobutton.component';

describe('CwRadiobuttonComponent', () => {
  let component: CwRadiobuttonComponent;
  let fixture: ComponentFixture<CwRadiobuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CwRadiobuttonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CwRadiobuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
