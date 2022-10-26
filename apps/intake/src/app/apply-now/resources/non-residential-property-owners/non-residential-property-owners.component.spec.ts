import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonResidentialPropertyOwnersComponent } from './non-residential-property-owners.component';

describe('NonResidentialPropertyComponent', () => {
  let component: NonResidentialPropertyOwnersComponent;
  let fixture: ComponentFixture<NonResidentialPropertyOwnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NonResidentialPropertyOwnersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonResidentialPropertyOwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
