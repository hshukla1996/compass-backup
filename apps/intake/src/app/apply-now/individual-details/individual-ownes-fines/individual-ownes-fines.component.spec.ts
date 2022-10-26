import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualOwnesFinesComponent } from './individual-ownes-fines.component';

describe('IndividualOwnesFinesComponent', () => {
  let component: IndividualOwnesFinesComponent;
  let fixture: ComponentFixture<IndividualOwnesFinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualOwnesFinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualOwnesFinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
