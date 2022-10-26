import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedOrEmptiedAccountComponent } from './closed-or-emptied-account.component';

describe('ClosedOrEmptiedAccountComponent', () => {
  let component: ClosedOrEmptiedAccountComponent;
  let fixture: ComponentFixture<ClosedOrEmptiedAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClosedOrEmptiedAccountComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedOrEmptiedAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
