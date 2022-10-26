import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualsEndingComponent } from './individuals-ending.component';

describe('BenefitsNotReceviedComponent', () => {
  let component: IndividualsEndingComponent;
  let fixture: ComponentFixture<IndividualsEndingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualsEndingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualsEndingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
