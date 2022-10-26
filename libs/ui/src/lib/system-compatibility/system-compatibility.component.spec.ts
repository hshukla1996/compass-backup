import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemCompatibilityComponent } from './system-compatibility.component';

describe('SystemCompatibilityComponent', () => {
  let component: SystemCompatibilityComponent;
  let fixture: ComponentFixture<SystemCompatibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemCompatibilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemCompatibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
