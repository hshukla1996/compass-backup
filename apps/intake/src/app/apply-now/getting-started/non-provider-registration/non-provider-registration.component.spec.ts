import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonProviderRegistrationComponent } from './non-provider-registration.component';

describe('NonProviderRegistrationComponent', () => {
  let component: NonProviderRegistrationComponent;
  let fixture: ComponentFixture<NonProviderRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonProviderRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonProviderRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
