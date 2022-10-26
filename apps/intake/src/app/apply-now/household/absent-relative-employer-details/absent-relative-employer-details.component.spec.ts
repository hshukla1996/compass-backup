import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsentRelativeEmployerDetailsComponent } from './absent-relative-employer-details.component';

describe('AbsentRelativeEmployerDetailsComponent', () => {
  let component: AbsentRelativeEmployerDetailsComponent;
  let fixture: ComponentFixture<AbsentRelativeEmployerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsentRelativeEmployerDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsentRelativeEmployerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
