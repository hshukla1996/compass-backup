import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsentRelativeAddressComponent } from './absent-relative-address.component';

describe('AbsentRelativeAddressComponent', () => {
  let component: AbsentRelativeAddressComponent;
  let fixture: ComponentFixture<AbsentRelativeAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsentRelativeAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsentRelativeAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
