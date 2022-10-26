import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CwDropdownComponent } from './cw-dropdown.component';

describe('CwDropdownComponent', () => {
  let component: CwDropdownComponent;
  let fixture: ComponentFixture<CwDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CwDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CwDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
