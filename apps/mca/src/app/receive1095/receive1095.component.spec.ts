import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Receive1095Component } from './receive1095.component';

describe('Receive1095Component', () => {
  let component: Receive1095Component;
  let fixture: ComponentFixture<Receive1095Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Receive1095Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Receive1095Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
