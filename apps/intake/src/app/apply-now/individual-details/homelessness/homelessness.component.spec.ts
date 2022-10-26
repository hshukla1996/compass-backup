import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomelessComponent } from './homelessness.component';

describe('HomelessComponent', () => {
  let component: HomelessComponent;
  let fixture: ComponentFixture<HomelessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomelessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomelessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
