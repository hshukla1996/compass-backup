import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CwTextareaComponent } from './cw-textarea.component';

describe('CwTextareaComponent', () => {
  let component: CwTextareaComponent;
  let fixture: ComponentFixture<CwTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CwTextareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CwTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
