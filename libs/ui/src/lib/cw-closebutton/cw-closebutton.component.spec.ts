import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CwClosebuttonComponent } from './cw-closebutton.component';

describe('CwClosebuttonComponent', () => {
  let component: CwClosebuttonComponent;
  let fixture: ComponentFixture<CwClosebuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CwClosebuttonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CwClosebuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
