import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntellectualDisabilityServicesComponent } from './intellectual-disability-services.component';

describe('IntellectualDisabilityServicesComponent', () => {
  let component: IntellectualDisabilityServicesComponent;
  let fixture: ComponentFixture<IntellectualDisabilityServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntellectualDisabilityServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntellectualDisabilityServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
