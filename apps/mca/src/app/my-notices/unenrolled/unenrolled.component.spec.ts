import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnenrolledComponent } from './unenrolled.component';

describe('UnenrolledComponent', () => {
  let component: UnenrolledComponent;
  let fixture: ComponentFixture<UnenrolledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnenrolledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnenrolledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
