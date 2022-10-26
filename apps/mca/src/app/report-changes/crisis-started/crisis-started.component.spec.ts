import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrisisStartedComponent } from './crisis-started.component';

describe('CrisisStartedComponent', () => {
  let component: CrisisStartedComponent;
  let fixture: ComponentFixture<CrisisStartedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrisisStartedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrisisStartedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
