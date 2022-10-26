import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonResidentialPropertyDetailsComponent } from './non-residential-property-details.component';

describe('NonResidentialPropertyDetailsComponent', () => {
  let component: NonResidentialPropertyDetailsComponent;
  let fixture: ComponentFixture<NonResidentialPropertyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonResidentialPropertyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonResidentialPropertyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
