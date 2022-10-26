import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GettingStartedEndingComponent } from './getting-started-ending.component';

describe('GettingStartedEndingComponent', () => {
  let component: GettingStartedEndingComponent;
  let fixture: ComponentFixture<GettingStartedEndingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GettingStartedEndingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GettingStartedEndingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
