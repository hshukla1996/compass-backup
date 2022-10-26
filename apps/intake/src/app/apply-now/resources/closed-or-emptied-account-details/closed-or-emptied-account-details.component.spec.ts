import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedOrEmptiedAccountDetailsComponent } from './closed-or-emptied-account-details.component';

describe('ClosedOrEmptiedAccountDetailsComponent', () => {
  let component: ClosedOrEmptiedAccountDetailsComponent;
  let fixture: ComponentFixture<ClosedOrEmptiedAccountDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClosedOrEmptiedAccountDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedOrEmptiedAccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
