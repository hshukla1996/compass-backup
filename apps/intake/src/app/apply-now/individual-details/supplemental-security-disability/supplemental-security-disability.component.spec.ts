import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplementalSecurityDisabilityComponent } from './supplemental-security-disability.component';

describe('SupplementalSecurityDisabilityComponent', () => {
  let component: SupplementalSecurityDisabilityComponent;
  let fixture: ComponentFixture<SupplementalSecurityDisabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplementalSecurityDisabilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplementalSecurityDisabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
