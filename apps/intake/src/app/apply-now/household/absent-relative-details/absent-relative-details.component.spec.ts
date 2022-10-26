import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsentRelativeDetailsComponent } from './absent-relative-details.component';

describe('AbsentRelativeDetailsComponent', () => {
  let component: AbsentRelativeDetailsComponent;
  let fixture: ComponentFixture<AbsentRelativeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsentRelativeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsentRelativeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
