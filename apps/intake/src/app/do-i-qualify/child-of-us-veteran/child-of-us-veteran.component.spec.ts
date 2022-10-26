import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildOfUsVeteranComponent } from './child-of-us-veteran.component';

describe('ChildOfUsVeteranComponent', () => {
  let component: ChildOfUsVeteranComponent;
  let fixture: ComponentFixture<ChildOfUsVeteranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildOfUsVeteranComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildOfUsVeteranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
