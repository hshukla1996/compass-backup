import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitLIHEAPComponent } from './submit-liheap.component';

describe('SubmitLIHEAPComponent', () => {
  let component: SubmitLIHEAPComponent;
  let fixture: ComponentFixture<SubmitLIHEAPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitLIHEAPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitLIHEAPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
