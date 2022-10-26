import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CwTextboxComponent } from './cw-textbox.component';

describe('CwTextboxComponent', () => {
  let component: CwTextboxComponent;
  let fixture: ComponentFixture<CwTextboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CwTextboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CwTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
