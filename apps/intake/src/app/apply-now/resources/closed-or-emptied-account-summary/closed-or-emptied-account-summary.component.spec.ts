import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedOrEmptiedAccountSummaryComponent } from './closed-or-emptied-account-summary.component';

describe('ClosedOrEmptiedAccountSummaryComponent', () => {
  let component: ClosedOrEmptiedAccountSummaryComponent;
  let fixture: ComponentFixture<ClosedOrEmptiedAccountSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClosedOrEmptiedAccountSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedOrEmptiedAccountSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
